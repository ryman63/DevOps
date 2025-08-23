FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Копируем fat JAR с правильным именем
COPY build/libs/devops-backend-1.0-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]