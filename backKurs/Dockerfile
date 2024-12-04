
# Стадия сборки
FROM eclipse-temurin:23.0.1_11-jre
EXPOSE 8080
WORKDIR /opt/app

# Копируем файлы проекта
COPY build/libs/*.jar app.jar

# Указываем команду запуска
ENTRYPOINT ["java", "-jar", "app.jar"]
