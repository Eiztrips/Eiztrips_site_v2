import axios from 'axios';

// Ваш API ключ для Giphy
const giphyApiKey = 'iQgxezMg38EAGvABl8qmgZfAxxVzzNCF';

// Функция для получения случайной гифки с котом
export const fetchRandomCatGif = async (): Promise<string | null> => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: giphyApiKey,
        tag: 'cat',  // Мы ищем гифки с котами
        rating: 'g',
      },
    });

    // Логируем полный ответ для отладки
    console.log('Full response data:', response.data);

    // Проверяем, что поле data не пустое
    if (response.data && response.data.data && response.data.data.images) {
      return response.data.data.images.original.url; // Возвращаем URL гифки
    } else {
      console.log('No gif data found in the response.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching random cat gif:', error);
    return null;
  }
};
