
Документация REST API


Обработка ошибок
API соответствует стандартным кодам состояния HTTP. В случае ошибки ответ JSON будет возвращен с error свойство, описывающее проблему.

# Клиентские маршруты
1. Получить элементы проектов

Конечная точка: /api/projectsItems 

метод: GET  
Параметры:  
page (необязательно): номер страницы для результатов с разбивкой на страницы (по умолчанию 1).  
pageSize (необязательно): количество элементов на странице (по умолчанию 3).  
## ответ:
```json
{
  "items": [
    // Array of project items
  ],
  "meta": {
    "totalItems": 10,
    "currentPage": 1,
    "pageSize": 3
  }
}
```
2. Получить товары с ценами на услуги  

Конечная точка: /api/services_pricesItems  

метод: GET  
Параметры:  
page (необязательно): номер страницы для результатов с разбивкой на страницы (по умолчанию 1).  
pageSize (необязательно): количество элементов на странице (по умолчанию 3).  

## ответ:
```json
{
  "items": [
    // Array of service price items
  ],
  "meta": {
    "totalItems": 10,
    "currentPage": 1,
    "pageSize": 3
  }
}
```

3. Получить обзоры  

Конечная точка: /api/reviewsItems

метод: GET  
Параметры:  
page (необязательно): номер страницы для результатов с разбивкой на страницы (по умолчанию 1).  
pageSize (необязательно): количество элементов на странице (по умолчанию 3).  


## ответ:
```json
{
  "items": [
    // Array of review items
  ],
  "meta": {
    "totalItems": 10,
    "currentPage": 1,
    "pageSize": 3
  }
}
```

4. Создать сообщение  

Конечная точка: /api/creatMessage

метод: POST  

## Тело запроса:
```json
{
  "communication_method": "Email",
  "client_name": "John Doe",
  "phone": "123-456-7890",
  "message": "This is a test message."
}
```

## ответ:
```json
{
  // JSON object representing the created message
}
```

5. Создать приложение  

Конечная точка: /api/creatApplication  

метод: POST  

## Тело запроса:
```json

{
  "communication_method": "Phone",
  "client_name": "Jane Doe",
  "phone": "987-654-3210",
  "message": "This is a test application."
}
```

## ответ:
```json
{
  // JSON object representing the created application
}
```


## Скачать маршруты
1. Загрузить файл  

Конечная точка: /download  

метод: GET  
Параметр запроса:  

fname: Имя файла для скачивания.  
## ответ:
В случае успеха файл будет загружен..  
Если файл не существует, будет возвращен статус 404..  
Если имя файла не указано, будет возвращен статус 400..  

  
  

  
# Клиентские маршруты

