# Нетология, Node.js backend.

### Задание 2.6 (MongoDB)
Вставка книг:
```javascript
db.books.insertMany([
    {
        title: 'Война и Мир',
        description: 'Роман Л.Н. Толстого о жизни русского общества в период наполеоновских войн.',
        authors: 'Л.Н. Толстой'
    }, 
    {
        title: 'Прествупление и наказание',
        description: 'Социально-философский роман Ф. М. Достоевского, содержащий много метакомментариев об обществе тех лет.',
        authors: 'Ф.М. Достоевский'
    }
])
```

Поиск по полю *title*:
```javascript
db.books.find({
    title: 'Война и мир'
})
```

Обновление полей:
```javascript
db.books.updateMany(
    { _id: 'mongo_id' },
    { 
        $set: {
            description: 'Новое описание',
            authors: 'Новый автор(ы)'
        }
    }
)
```
