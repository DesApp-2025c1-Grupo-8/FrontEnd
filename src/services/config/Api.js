import axios from 'axios';

export default class Api {
    static AxiosInstance(){
        return axios.create({
            baseURL: 'http://localhost:5000', // URL de API
            timeout: 10000, // 10 segundos
            headers: {
                'Content-Type': 'application/json',
                //headers por defecto
            }
        });
    }
}

// Ejemplo de uso en BaseService