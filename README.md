# 📁 File API (Express + TypeScript + MySQL)

Полноценный REST API для загрузки, получения и удаления файлов с системой авторизации на основе JWT и многосессийной поддержкой refresh-токенов.

## 🚀 Технологии

- Node.js + Express
- TypeScript
- Sequelize ORM (MySQL)
- JWT (access / refresh токены)
- Multer (для загрузки файлов)
- Joi (валидация)
- CORS

---

## 📦 Установка

### 1. Клонируй проект и установи зависимости

```bash
git clone https://github.com/teomayy/test-file-api
cd test-file-api
npm install
```

### 2. Настрой `.env` файл

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=file_api
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 3. Запуск проекта

```bash
npm run dev
```

> ✅ Sequelize автоматически подключается к БД.

---

## 🔐 Авторизация

- `POST /auth/signup` — регистрация нового пользователя
- `POST /auth/signin` — вход в систему
- `POST /auth/signin/new_token` — обновление accessToken по refreshToken
- `POST /auth/logout` — выход из текущей сессии
- `GET /auth/info` — получить ID текущего пользователя

Все защищённые маршруты требуют заголовок:

```
Authorization: Bearer <accessToken>
```

---

## 📁 Работа с файлами

Все маршруты `/file/*` требуют авторизации.

- `POST /file/upload` — загрузить файл (multipart/form-data, поле `file`)
- `GET /file/list?page=1&list_size=10` — получить список файлов с пагинацией
- `GET /file/:id` — получить информацию о файле
- `GET /file/download/:id` — скачать файл
- `DELETE /file/delete/:id` — удалить файл
- `PUT /file/update/:id` — заменить файл

---

## ✅ Безопасность

- Access токен живёт 10 минут
- Refresh токен живёт 7 дней и поддерживает многосессийность (по `deviceId`)
- При выходе удаляется только конкретная сессия
- Старые токены становятся недействительными
- Защита от подделки токена через проверку сессии в БД
- Валидация всех `req.body` через Joi

---

## 📥 Postman Collection

Импортируйте файл `FileAPI_Postman_Collection.json` в Postman для быстрого тестирования всех маршрутов.

---

## 👨‍💻 Автор Ибрагим

Сделано с ❤️ в рамках тестогого задание продвинутой архитектуры Express + TS.
