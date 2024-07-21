FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/solicitudadopcion-0.0.1.jar
COPY ${JAR_FILE} app_solicitudadopcion.jar
ENTRYPOINT ["java", "-jar", "app_solicitudadopcion.jar"]