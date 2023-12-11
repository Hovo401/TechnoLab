# Документация по REST API
Обзор  
Этот документ предоставляет информацию о REST API для сервера. API разработано для управления различными задачами, связанными с администрированием, включая создание токенов, управление проектами, ценами на услуги, отзывами, сообщениями, заявками и загрузками.  

### Базовый URL: /api/admin
[Перейти к Заголовку 1]()  
[Содержание](#Содержание)  
![Аутентификация]  
![Создание токена]  
[Проекты](#title2)  
![Цены на услуги]  
![Отзывы]  
![Сообщения]  
![Заявки]  
![Загрузки]  


# Аутентификация

Все запросы к конечным точкам API, начинающимся с /api/  admin, требуют аутентификации. Аутентификация   осуществляется с использованием токена, предоставленного   сервером. Чтобы получить токен, используйте конечную точку /  creatTokin с действительными учетными данными   администратора.  

Создание токена
POST /creatTokin
Создает и возвращает токен аутентификации.

Запрос:

json
Copy code
{
  "login": "admin_username",
  "password": "admin_password"
}
Ответ:

json
Copy code
{
  "tokin": "сгенерированный_токен"
}
# Проекты
Создание проекта
POST /project
Создает новый проект.

Запрос:

Заголовки: Authorization: Bearer <token>
Тело:
json
Copy code
{
  "name": "Название проекта",
  "short_description": "Краткое описание проекта",
  "deadline_min_day": 10,
  "deadline_max_day": 10,
  "types": ["тип1", "тип2"],
  "url": "https://ссылка-на-проект.com",
  "file": (загрузка файла)
}
Ответ:

json
Copy code
{
  "message": "Проект создан"
}
Обновление проекта
PUT /project/:id
Обновляет существующий проект.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры: id - Идентификатор проекта
Тело:
json
Copy code
{
  "name": "Обновленное название проекта",
  "short_description": "Обновленное описание проекта",
  "deadline_min_day": 15,
  "deadline_max_day": 20,
  "types": ["тип1", "тип3"],
  "url": "https://обновленная-ссылка-на-проект.com",
  "file": (загрузка файла)
}
Ответ:

json
Copy code
{
  "message": "Проект обновлен"
}
Удаление проекта
DELETE /project/:id
Удаляет проект.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры: id - Идентификатор проекта
Ответ:

json
Copy code
{
  "message": "Проект удален"
}
Цены на услуги
Создание цены на услугу
POST /services_prices
Создает новую цену на услугу.

Запрос:

Заголовки: Authorization: Bearer <token>
Тело:
json
Copy code
{
  "title": "Название услуги",
  "short_description": "Краткое описание услуги",
  "deadlines": "2-3 дня",
  "hit": true,
  "price": 100,
  "currency": "USD",
  "price_individually": false,
  "time_individually": false
}
Ответ:

json
Copy code
{
  "message": "Цена на услугу создана"
}
Обновление цены на услугу
PUT /services_prices/:id
Обновляет существующую цену на услугу.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры: id - Идентификатор цены на услугу
Тело:
json
Copy code
{
  "title": "Обновленное название услуги",
  "short_description": "Обновленное описание услуги",
  "deadlines": "4-5 дней",
  "hit": false,
  "price": 150,
  "currency": "EUR",
  "price_individually": true,
  "time_individually": true
}
Ответ:

json
Copy code
{
  "message": "Цена на услугу обновлена"
}
Удаление цены на услугу
DELETE /services_prices/:id
Удаляет цену на услугу.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры: id - Идентификатор цены на услугу
Ответ:

json
Copy code
{
  "message": "Цена на услугу удалена"
}
Отзывы
Создание отзыва
POST /review
Создает новый отзыв.

Запрос:

Заголовки: Authorization: Bearer <token>
Тело:
json
Copy code
{
  "name": "Имя рецензента",
  "review": "Детальное содержание отзыва",
  "img": "https://ссылка-на-изображение.com",
  "url": "https://ссылка-на-отзыв.com"
}
Ответ:

json
Copy code
{
  "message": "Отзыв создан"
}
Удаление отзыва
DELETE /reviews/:id
Удаляет отзыв.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры: id - Идентификатор отзыва
Ответ:

json
Copy code
{
  "message": "Отзыв удален"
}
Сообщения
Получение сообщений
GET /messagesItems
Получает пагинированный список сообщений.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры запроса:
page (опционально, по умолчанию: 1)
pageSize (опционально, по умолчанию: 3)
Ответ:

json
Copy code
{
  "items": [...],
  "meta": {
    "totalItems": 10,
    "currentPage": 1,
    "pageSize": 3
  }
}
Удаление сообщения
DELETE /message/:id
Удаляет сообщение.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры: id - Идентификатор сообщения
Ответ:

json
Copy code
{
  "message": "Сообщение удалено"
}
Заявки
Получение заявок
GET /applicationsItems
Получает пагинированный список заявок.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры запроса:
page (опционально, по умолчанию: 1)
pageSize (опционально, по умолчанию: 3)
Ответ:

json
Copy code
{
  "items": [...],
  "meta": {
    "totalItems": 5,
    "currentPage": 1,
    "pageSize": 3
  }
}
Удаление заявки
DELETE /application/:id
Удаляет заявку.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры: id - Идентификатор заявки
Ответ:

json
Copy code
{
  "message": "Заявка удалена"
}
Загрузки
Получение загрузок
GET /downloadsItems
Получает пагинированный список загрузок.

Запрос:

Заголовки: Authorization: Bearer <token>
Параметры запроса:
page (опционально, по умолчанию: 1)
pageSize (опционально, по умолчанию: 3)
Ответ:

json
Copy code
{
  "items": [...],
  "meta": {
    "totalItems": 8,
    "currentPage": 1,
    "pageSize": 3
  }
}