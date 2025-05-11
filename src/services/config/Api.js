import axios from 'axios';

class Api {
    constructor() {
        this._axiosInstance = null; // Variable privada para almacenar la instancia de Axios
    }
    AxiosInstance() {
        if (!this._axiosInstance) {
            this._axiosInstance = axios.create({
                baseURL: 'http://localhost:5000', // URL de API
                timeout: 10000, // 10 segundos
                headers: {
                    'Content-Type': 'application/json',
                    //headers por defecto
                }
            });
        }
        return this._axiosInstance;
    }
}
export default new Api(); // Instancia �nica de la clase Api (Singleton)
// Ejemplo de uso en BaseService