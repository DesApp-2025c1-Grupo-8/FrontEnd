import WebApi from './config/Api.js';

class BaseService {
    // Ejemplo de uso básico de llamada simple a BE
    async getRandom() {
        try {
            const response = await WebApi.AxiosInstance().get('/testingCommonFunctions');
            //throw new Error('Simulando un error en el backend');
            return { data: response.data, error: null };
        } catch (error) {
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

}
export default new BaseService();// Instancia única de la clase BaseService (Singleton)
