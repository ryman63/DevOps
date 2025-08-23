FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Сначала копируем только JAR файл
COPY build/libs/*.jar app.jar

# Проверяем манифест при сборке (опционально)
RUN jar tf app.jar | grep META-INF/MANIFEST.MF || echo "Manifest check failed"

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Добавляем healthcheck для Kubernetes
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1