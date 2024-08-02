FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/contactanos-0.0.1.jar
COPY ${JAR_FILE} app_contactame.jar
ENTRYPOINT ["java", "-jar", "app_contactame.jar"]