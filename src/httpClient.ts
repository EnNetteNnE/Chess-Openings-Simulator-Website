import axios, { AxiosResponse } from 'axios';

// Интерфейс для описания сущности данных
interface User {
    id: number;
    name: string;
    email: string;
}

// Функция для отправки POST-запроса
async function createUser(userData: User): Promise<AxiosResponse<User>> {
    try {
        const response: AxiosResponse<User> = await axios.post<User>('https://jsonplaceholder.typicode.com/users', userData);
        console.log('Пользователь создан:', response.data);
        return response;
    } catch (error) {
        console.error('Ошибка при создании пользователя:', error);
        throw error;
    }
}

// Функция для отправки GET-запроса для получения всех пользователей
async function getUsers(): Promise<AxiosResponse<User[]>> {
    try {
        const response: AxiosResponse<User[]> = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
        console.log('Полученные пользователи:', response.data);
        return response;
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error);
        throw error;
    }
}

// Функция для получения данных конкретного пользователя по его ID
async function getUserById(userId: number): Promise<AxiosResponse<User>> {
    try {
        const response: AxiosResponse<User> = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
        console.log('Данные пользователя:', response.data);
        return response;
    } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        throw error;
    }
}

// Пример использования функций
async function main() {
    // Отправляем POST-запрос для создания нового пользователя
    const newUser: User = {
        id: 0, // ID будет сгенерирован сервером
        name: 'Новый Пользователь',
        email: 'novyj_poljzovatel@mail.com'
    };

    await createUser(newUser);

    // Получаем всех пользователей
    const usersResponse = await getUsers();
    
    // Получаем данные конкретного пользователя по ID, например, ID = 1
    const userId = 1; // Или другой ID пользователя
    const userResponse = await getUserById(userId);
    const userData = userResponse.data; // Данные конкретного пользователя

    // Теперь данные конкретного пользователя доступны в main
    console.log('Данные конкретного пользователя в main:', userData);
}

// Запуск основной функции
main().catch(error => console.error('Ошибка в main:', error));