import WebAPI from './config/WebAPI.js';

class DestinosService {
    // Obtener todos los destinos
    static async obtenerDestinos() {
        try {
            const response = await WebAPI.Instance().get('/Destino/All');
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener destinos:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Obtener un destino por ID
    static async obtenerDestinoPorId(id) {
        try {
            const response = await WebAPI.Instance().get(`/Destinos/ObtenerDestino/${id}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener destino por ID:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Crear nuevo destino
    static async crearDestino(destino) {
        try {
            const response = await WebAPI.Instance().post('/Destinos/CrearDestino', destino);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al crear destino:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Actualizar destino
    static async actualizarDestino(id, destino) {
        try {
            const response = await WebAPI.Instance().put(`/Destinos/ActualizarDestino/${id}`, destino);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al actualizar destino:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Eliminar destino
    static async eliminarDestino(id) {
        try {
            const response = await WebAPI.Instance().delete(`/Destinos/EliminarDestino/${id}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al eliminar destino:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }
}

export default DestinosService; 