# Сайт-тренажер шахматных дебютов

*Данный сайт позволяет пользователям изучать и тренироваться в шахматных дебютах, предоставляет функционал регистрации и авторизации пользователей, возможность создания и проигрывания собственных дебютов*
* frontend: HTML5, CSS3, TypeScript, фреймворк React
* backend: Java (Spring Boot, gradel)
* база данных: PostgreSQL или MySQL
* использование технологии SPA
* для передачи позиции через запросы использованна нотация Форсайта — Эдвардса 

***Скрины работы***

<figcaption>Поля ввода</figcaption>
<img src="/img/1.png" alt="Окно для регистрации/авторизации" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/2.png" alt="Предупреждение о неверной длине" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/3.png" alt="Предупреждение о повторяющемся пользователе" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/4.png" alt="Ввод неверных данных при попытке входа на сайт" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/5.png" alt="Успешная регистрация пользователя" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/6.png" alt="Приветственное окно" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/7.png" alt="Создание дебюта" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/8.png" alt="Просмотр и дополнение дебютного дерева" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/9.png" alt="Выбор цвета игры" width="350">

<figcaption>Поля ввода</figcaption>
<img src="/img/10.png" alt="Неверный ход" width="350">


***Для запуска сайта необходимо выполнить следуещие пункты***
* Из рабочей дирректории backKurs выполнить команду sudo docker run -d --name contain -p 8080:80 final
* Из рабочей дирректории frontKurs выполнить команду npm start
* Выполнить команды для установки react, spring boot (опционально)

**Настройки сервера**
* server.port=8080
* server.host=localhost

**Настройки базы данных**
* spring.application.name=EvaChess
* spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
* spring.datasource.username=myuser
* spring.datasource.password=123
* spring.datasource.driver-class-name=org.postgresql.Driver
* spring.jpa.hibernate.ddl-auto=update
* spring.jpa.generate-ddl=true
