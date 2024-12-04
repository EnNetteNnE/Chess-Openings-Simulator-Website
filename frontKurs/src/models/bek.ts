/*export async function sendLoginRequest(login: string, password: string, user: object): Promise<number | null> {
    const url = 'http://localhost:8080/user'; // Замените на ваш локальный URL

    const requestBody = {
        login: login,
        password: password,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // Проверяем, был ли запрос успешным
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const id = Number(data.id);

        // Предполагаем, что в ответе есть поле id
        console.log('aaaaaaaaaaa');
        console.log(data.id);


        return data.id; // Возвращаем id из ответа

        
    } catch (error) {
        console.error('Error occurred during the POST request:', error);
        return 0; // Возвращаем null в случае ошибки
    }
}

// Пример вызова функции
sendLoginRequest('yourLogin', 'yourPassword')
    .then(id => {
        if (id !== null) {
            console.log('Received ID:', id);
        } else {
            console.log('Failed to retrieve ID.');
        }
    });


    import axios from 'axios';

    // Определяем интерфейс для ожидаемого ответа от сервера
    interface ServerResponse {
        id: number; // Предполагаем, что id – это число
        // Вы можете добавить тут другие поля, если это необходимо
        login: string,
        password: string
    }
    
    // Функция для отправки POST-запроса
    export async function sendLoginRequest(login: string, password: string): Promise<number | null> {
        const url = 'http://localhost:8080/user'; // Замените на ваш URL
    
        try {
            // Отправка POST-запроса с данными
            const response = await axios.post<ServerResponse>(url, {
                login: login,
                password: password,
            });
    
            // Обрабатываем ответ и возвращаем id
            console.log('aaaaaaaaaaa');
            console.log(response.data.id);
            return response.data.id;
        } catch (error) {
            // Обработка ошибок
            console.error('Error sending the request:', error);
            
            // Возвращаем null в случае ошибки
            return null;
        }
    }
 



    export async function sendLoginRequest(username: string, password: string): Promise<number> {
        const url = 'http://localhost:8080/user'; // Укажите ваш URL
    
        const requestBody = {
            login: username,
            password: password,
        };
    
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Received data:', data); // Проверяем, что сервер вернул
    
        if (!data || typeof data.id === 'undefined') {
            throw new Error('ID is missing from response');
        }
    
        const id = Number(data.id); // Приводим к числу
        if (isNaN(id)) {
            throw new Error('ID is not a valid number');
        }
    
        return id;}
   */    


        export function sendPostUser(login: string, password: string): number {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/user'; // Замените на ваш URL

            const requestBody = {
                login: login,
                password: password,
            };
        
            // Создаем объект с данными для отправки
            const data = JSON.stringify(requestBody);
        
            // Инициализируем запрос
            xhr.open('POST', url, false); // false делает запрос синхронным
        
            // Устанавливаем заголовок для отправки JSON
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            // Отправляем запрос
            xhr.send(data);
        
            
                // Парсим ответ в JSON
                const response = JSON.parse(xhr.responseText);
                // Возвращаем значение поля id

                //console.log('aaaaaaaaaaa');
                //console.log(response.id);

                return response.id; // Предполагается, что id - это число
            
        }




        export function sendPostUserToken(login: string, password: string): string {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/user/token'; // Замените на ваш URL

            const requestBody = {
                login: login,
                password: password,
            };
        
            // Создаем объект с данными для отправки
            const data = JSON.stringify(requestBody);
        
            // Инициализируем запрос
            xhr.open('POST', url, false); // false делает запрос синхронным
        
            // Устанавливаем заголовок для отправки JSON
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            // Отправляем запрос
            xhr.send(data);
        
                // Возвращаем ответ как строку
            return xhr.responseText; // Предполагается, что ответ - это строка

        }


        export function sendPostTree(name: string, token: string): number {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/tree'; // Замените на ваш URL

            const requestBody = {
                name: name
            };
        
            // Создаем объект с данными для отправки
            const data = JSON.stringify(requestBody);
        
            // Инициализируем запрос
            xhr.open('POST', url, false); // false делает запрос синхронным


            // Устанавливаем заголовок для токена
            xhr.setRequestHeader('token', token); // Используем 'token' вместо 'Authorization'

            // Устанавливаем заголовок для отправки JSON
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            // Отправляем запрос
            xhr.send(data);
        
            
                // Парсим ответ в JSON
                const response = JSON.parse(xhr.responseText);
                // Возвращаем значение поля id

                //console.log('aaaaaaaaaaa');
                //console.log(response.id);
                console.log("asasasas", response.id)
                return response.id; // Предполагается, что id - это число
            
        }

        export function sendGetTree(token: string): { id: number; name: string }[] {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/tree'; // Замените на ваш URL
        
            // Инициализируем запрос
            xhr.open('GET', url, false); // false делает запрос синхронным
        
            // Устанавливаем заголовок для токена
            xhr.setRequestHeader('token', token); // Используем 'token' вместо 'Authorization'
        
            // Отправляем запрос
            xhr.send();
        
                // Парсим ответ в JSON и возвращаем массив объектов
            return JSON.parse(xhr.responseText); // Предполагается, что ответ - это массив объектов
            
        }

        export function sendGetMoveTree(treeId: number): number {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/move/tree/' + treeId; // Замените на ваш URL
        
            // Инициализируем запрос
            xhr.open('GET', url, false); // false делает запрос синхронным
        
            // Устанавливаем заголовок для токена
            //xhr.setRequestHeader('token', token); // Используем 'token' вместо 'Authorization'
        
            // Отправляем запрос
            xhr.send();
        
            const response = JSON.parse(xhr.responseText);
                // Возвращаем значение поля id

                //console.log('aaaaaaaaaaa');
                //console.log(response.id);
            //console.log("asasasas", response.id)
            return response.id; // Предполагается, что id - это число
            
        }

        export function sendGetMoveNext(idMove: number): {
            id: number,
            number: number,
            treeId: number,
            positionAfter: string,
            nameMove: null | string,
            colorWhite: boolean,
            preventMove: number
        }[] {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/move/next/' + idMove; // Замените на ваш URL
        
            // Инициализируем запрос
            xhr.open('GET', url, false); // false делает запрос синхронным
        
            // Устанавливаем заголовок для токена
            //xhr.setRequestHeader('token', token); // Используем 'token' вместо 'Authorization'
        
            // Отправляем запрос
            xhr.send();
        
                // Парсим ответ в JSON и возвращаем массив объектов
            //let A: { id: number; positionAfter: string }[] = [];
            return JSON.parse(xhr.responseText); // Предполагается, что ответ - это массив объектов
            
        }

        export function sendGetMoveRandom(idMove: number): {
            id: number,
            number: number,
            treeId: number,
            positionAfter: string,
            nameMove: null | string,
            colorWhite: boolean,
            preventMove: number
        } {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/move/random/' + idMove; // Замените на ваш URL
        
            // Инициализируем запрос
            xhr.open('GET', url, false); // false делает запрос синхронным
        
            // Устанавливаем заголовок для токена
            //xhr.setRequestHeader('token', token); // Используем 'token' вместо 'Authorization'
        
            // Отправляем запрос
            xhr.send();
        
                // Парсим ответ в JSON и возвращаем массив объектов
            //let A: { id: number; positionAfter: string }[] = [];
            return JSON.parse(xhr.responseText); // Предполагается, что ответ - это массив объектов
            
        }


        export function sendPostMove(treeId: number, positionAfter: string, preventMoveId: number, colorWhite: boolean, token: string): number {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/move'; // Замените на ваш URL

            const requestBody = {
                treeId: treeId,
                positionAfter: positionAfter,
                preventMoveId: preventMoveId,
                colorWhite: colorWhite
            }
        
            // Создаем объект с данными для отправки
            const data = JSON.stringify(requestBody);
        
            // Инициализируем запрос
            xhr.open('POST', url, false); // false делает запрос синхронным


            // Устанавливаем заголовок для токена
            xhr.setRequestHeader('token', token); // Используем 'token' вместо 'Authorization'

            // Устанавливаем заголовок для отправки JSON
            xhr.setRequestHeader('Content-Type', 'application/json');
        
            // Отправляем запрос
            xhr.send(data);
        
            
                // Парсим ответ в JSON
                const response = JSON.parse(xhr.responseText);
                // Возвращаем значение поля id

                //console.log('aaaaaaaaaaa');
                //console.log(response.id);
                console.log("asasasas", response.id)
                return response.id; // Предполагается, что id - это число
            
        }

        export function sendDeleteUserToken(token: string) {
            const xhr = new XMLHttpRequest();
            const url = 'http://localhost:8080/user/token'; // Замените на ваш URL
        
            // Инициализируем запрос
            xhr.open('DELETE', url, false); // false делает запрос синхронным
        
            // Устанавливаем заголовок для токена
            xhr.setRequestHeader('token', token); // Используем 'token' вместо 'Authorization'
        
            // Отправляем запрос
            xhr.send();
        
                // Парсим ответ в JSON и возвращаем массив объектов
            return 0; // Предполагается, что ответ - это массив объектов
            
        }


export function hashPassword(input: string): string { // MD5

    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i); // hash * 31 + charCode
        hash |= 0; // Приведение к 32-битному знаковому числу
    }

    // Преобразуем хэш в строку в шестнадцатеричном формате
    let result = Math.abs(hash).toString(16);
    return result.substring(0, 40);
}

     /*      
// Пример использования
const password = 'my_secure_password';
const hashed = hashPassword(password);
console.log(`Хэшированный пароль: ${hashed}`);

        // Пример использования
        try {
            const token = 'your_token_here'; // Замените на ваш токен
            const dataArray = sendGetRequest(token);
            console.log('Data:', dataArray);
        } catch (error) {
            console.error(error);
        }

     
        // Пример использования
        try {
            const responseString = sendPostRequest('myLogin', 'myPassword');
            console.log('Response:', responseString);
        } catch (error) {
            console.error(error);
        }
    
        // Пример использования
        try {
            const userId = sendPostRequest('myLogin', 'myPassword');
            console.log('User  ID:', userId);
        } catch (error) {
            console.error(error);
        }
    */