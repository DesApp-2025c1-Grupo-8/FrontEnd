import axios from 'axios';

class Api {
    AxiosInstance(){
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
export default new Api(); // Instancia única de la clase Api (Singleton)
// Ejemplo de uso en BaseService