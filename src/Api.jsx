import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.com', // URL de API
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
    //headers por defecto
  }
});

export default axiosInstance;

/*
import axios from '../api/axiosInstance';

// Ejemplo de uso
axios.get('/remitos')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
*/