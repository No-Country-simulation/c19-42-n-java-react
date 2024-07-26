package com.adoptify.config;

import com.adoptify.dto.RequestDto;
import com.adoptify.dto.TokenDto;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

	private final WebClient.Builder webClient;
	private final ExcludedPathsConfig excludedPathsConfig;

	public AuthFilter(WebClient.Builder webClient, ExcludedPathsConfig excludedPathsConfig) {
		super(Config.class);
		this.webClient = webClient;
		this.excludedPathsConfig = excludedPathsConfig;
	}

	@Override
	public GatewayFilter apply(Config config) {
		return (exchange, chain) -> {
			String requestPath = exchange.getRequest().getPath().toString();

			// Check if the request path is in the excluded paths list
			if (isExcludedPath(requestPath)) {
				return chain.filter(exchange);
			}

			if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
				return chain.filter(exchange); // Delega manejo de CORS al CorsWebFilter
			}

			if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
				return onError(exchange, HttpStatus.BAD_REQUEST);
			}

			String tokenHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
			String[] chunks = tokenHeader.split(" ");
			if (chunks.length != 2 || !chunks[0].equals("Bearer")) {
				return onError(exchange, HttpStatus.BAD_REQUEST);
			}

			return webClient.build()
				.post()
				.uri("http://auth-service/auth/validate?token=" + chunks[1])
				.bodyValue(new RequestDto(requestPath, exchange.getRequest().getMethod().toString()))
				.retrieve()
				.bodyToMono(TokenDto.class)
				.flatMap(tokenDto -> chain.filter(exchange));
		};
	}

	private boolean isExcludedPath(String requestPath) {
		return excludedPathsConfig.getPaths().stream()
			.anyMatch(excludedPath -> requestPath.startsWith(excludedPath));
	}

	private Mono<Void> onError(ServerWebExchange exchange, HttpStatus httpStatus) {
		ServerHttpResponse response = exchange.getResponse();
		response.setStatusCode(httpStatus);
		return response.setComplete();
	}

	public static class Config {
	}
}
