# Техническое задание (ТЗ) на разработку сервиса "Планировщик техобслуживания автомобиля"

## 1. Введение

Цель проекта — разработка веб-сервиса, позволяющего пользователям отслеживать техническое обслуживание своих автомобилей, получать напоминания о предстоящих работах и хранить историю всех выполненных операций.

---

## 2. Функциональные требования

### 2.1 Пользовательская часть (Frontend)
- **Автомобили:**
    - Добавление нового автомобиля (марка, модель, год, VIN).
    - Просмотр списка автомобилей.
    - Редактирование данных автомобиля.
    - Удаление автомобиля.

- **Обслуживание:**
    - Добавление записи о проведенном обслуживании (тип работ, пробег, дата, стоимость, заметки).
    - Просмотр истории обслуживаний для конкретного автомобиля.
    - Редактирование и удаление записей о ТО.

- **Напоминания:**
    - Создание напоминаний о предстоящем обслуживании (например, "Замена масла" по пробегу или дате).
    - Автоматическая деактивация напоминаний при достижении условий.
    - Просмотр и управление напоминаниями (активировать, деактивировать, редактировать, удалять).

---

## 3. Нефункциональные требования

- **Архитектура:** REST API (backend) + SPA (frontend).

- **Надежность:** Автоматические напоминания не должны теряться.

---

## 4. Технологический стек

- **Backend:** Java (Spring Boot).
- **Frontend:** React.
- **База данных:** PostgreSQL.
- **Контейнеризация:** Docker.
- **CI/CD:** GitLab CI (этапы: build, test, sonar, docker, deploy, notify).

---

## 6. Безопасность и качество (лучшие практики)

- **SAST и контроль качества**: SonarQube с Quality Gate. Порог покрытия тестами установлен на 80% (frontend: Jest threshold, backend: JaCoCo verification). Пайплайн падает при нарушении порога/ошибках качества.
- **Изоляция секретов**: все токены и доступы передаются через переменные GitLab CI (`SONAR_TOKEN`, `KUBE_CONFIG`, `REGISTRY_PASSWORD`, `TELEGRAM_BOT_TOKEN`, и т.д.).
- **Dependency hygiene**: воспроизводимые сборки (`npm ci`, фиксированные версии Gradle плагинов). Рекомендация: периодический `npm audit`/OWASP Dependency Check (можно добавить отдельным job).
- **Контейнерная безопасность**: минимальные базовые образы (alpine), многоэтапная сборка фронта, явные лимиты ресурсов в манифестах.
- **Наблюдаемость**: Prometheus/Grafana поддержаны архитектурно (см. пример в `C:\Devops4`), можно расширить.

---

## 7. SonarQube

- Манифесты: `k8s/sonarqube.yaml` (namespace, Deployment, Service). По умолчанию `ClusterIP`. При необходимости добавить Ingress/LoadBalancer.
- Конфиги проектов:
  - Backend: `devops-backend/sonar-project.properties` (учитывает `jacocoTestReport.xml`).
  - Frontend: `devops-front/sonar-project.properties` (использует `coverage/lcov.info`).
- В пайплайне этап `sonar` выполняет анализ и ждет Quality Gate (`sonar.qualitygate.wait=true`).

Переменные окружения в GitLab:
- `SONAR_HOST_URL` (например, `http://sonarqube.sonarqube.svc.cluster.local:9000` или внешний URL)
- `SONAR_TOKEN`

---

## 8. Покрытие тестами

- Frontend (Jest):
  - Порог 80% задан в `devops-front/jest.config.js` (`coverageThreshold`).
  - Команда в CI: `npm test -- --coverage --watchAll=false`.
- Backend (JaCoCo):
  - Конфигурация в `devops-backend/build.gradle` (плагины `jacoco`, `sonarqube`, задача `jacocoTestCoverageVerification` с 80%).
  - В CI запускается `./gradlew clean test jacocoTestReport jacocoTestCoverageVerification`.

Если пороги не достигнуты — job `test_*` завершится с ошибкой.

---

## 9. Интеграция с облачными сервисами

- **RabbitMQ**: манифест `k8s/rabbitmq.yaml` (Deployment, Service, Secret). Используется для брокера сообщений. При необходимости добавьте переменные окружения в backend для подключения.
- **Telegram уведомления**: этап `notify` в CI отправляет сообщение о успешном деплое.

Переменные окружения в GitLab для уведомлений:
- `TELEGRAM_BOT_TOKEN`, `C:\Users\Ефим\cloud-terraform4\cloud-terraform`.

---

## 10. CD: деплой в Kubernetes

Пайплайн включает этапы `docker` (сборка/публикация образов) и `deploy` (применение манифестов и обновление образов).

Переменные окружения в GitLab для деплоя/регистра:
- `REGISTRY` (например, `cr.yandex` или `registry.hub.docker.com`)
- `REGISTRY_USER`, `REGISTRY_PASSWORD`
- `IMAGE_FRONTEND` (полное имя образа, например, `cr.yandex/<registry-id>/frontend`)
- `IMAGE_BACKEND` (полное имя образа, например, `cr.yandex/<registry-id>/backend`)
- `KUBE_CONFIG` — base64 от kubeconfig кластера.

Kubernetes манифесты: `k8s/*.yaml`. Пайплайн обновляет образы командой `kubectl set image` для `deployment/frontend` и `deployment/backend`.

---

## 11. Локальный запуск

- Backend: `cd devops-backend && ./gradlew bootRun`
- Frontend: `cd devops-front && npm ci && npm run dev`

---

## 12. Требования к окружению CI

- GitLab Runner с включенным Docker-in-Docker для этапов `docker`.
- Доступ runner'а к SonarQube по `SONAR_HOST_URL`.

---

## 5. API и структура базы данных

### 5.1 API (RESTful CRUD)

1. `/api/cars` — управление автомобилями.
2. `/api/services` — управление записями о ТО.
3. `/api/reminders` — напоминания.

### 5.2 Структура базы данных

#### Автомобили (`cars`)

```sql
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
make VARCHAR(50) NOT NULL,
model VARCHAR(50) NOT NULL,
year INT CHECK (year >= 1886),
vin VARCHAR(17) UNIQUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

#### Обслуживание (`service_records`)

```sql
id SERIAL PRIMARY KEY,
car_id INT REFERENCES cars(id) ON DELETE CASCADE,
service_type VARCHAR(100) NOT NULL,
mileage INT NOT NULL,
service_date DATE NOT NULL,
cost DECIMAL(10,2),
notes TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

#### Напоминания (`reminders`)

```sql
id SERIAL PRIMARY KEY,
car_id INT REFERENCES cars(id) ON DELETE CASCADE,
reminder_type VARCHAR(100) NOT NULL,
due_mileage INT,
due_date DATE,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

## 6. Типы обслуживания авто

1. Замена воздушного фильтра
2. Замена салонного фильтра
3. Замена масла двигателя
4. Замена масла в КПП
5. Замена тормозных колодок
6. Замена тормозных дисков
7. Замена свечей зажигания
8. Замена антифриза
9. Замена тормозной жидкости
10. Замена стоек стабилизатора
11. Замена пыльников амортизатора
12. Замена тормозных трубок


