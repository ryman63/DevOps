FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Копируем JAR
COPY build/libs/app.jar app.jar

# Проверяем что JAR скопировался
RUN echo "Checking JAR file..." && \
    ls -la /app/ && \
    if [ -f /app/app.jar ]; then \
        echo "JAR exists, checking manifest..." && \
        jar tf /app/app.jar | grep MANIFEST.MF || echo "Manifest not found!"; \
    else \
        echo "ERROR: JAR file not found!"; \
        exit 1; \
    fi

ENTRYPOINT ["java", "-jar", "/app/app.jar"]