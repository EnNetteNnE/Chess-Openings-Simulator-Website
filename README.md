# Kursovaia.3sem

***Сайт-тренажер шахматных дебютов***

###Для запуска сайта необходимо выполнить следуещие пункты
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
