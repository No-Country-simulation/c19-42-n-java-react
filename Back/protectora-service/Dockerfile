FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/protectora-service-0.0.1.jar
COPY ${JAR_FILE} app_protectora.jar
ENTRYPOINT ["java", "-jar", "app_protectora.jar"]