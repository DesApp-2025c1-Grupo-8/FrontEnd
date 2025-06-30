import WebAPI from './config/WebAPI.js';

class EstadosRemitoService {
    // Obtener todos los estados de remito
    async obtenerEstados() {
        try {
            const response = await WebAPI.Instance().get('/Varios/ObtenerEstados');
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener estados:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Obtener un estado por ID
    async obtenerEstadoPorId(id) {
        try {
            const response = await WebAPI.Instance().get(`/Varios/ObtenerEstado/${id}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener estado por ID:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Crear nuevo estado
    async crearEstado(estado) {
        try {
            const response = await WebAPI.Instance().post('/Varios/CrearEstado', estado);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al crear estado:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Actualizar estado
    async actualizarEstado(id, estado) {
        try {
            const response = await WebAPI.Instance().put(`/Varios/ActualizarEstado/${id}`, estado);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al actualizar estado:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Eliminar estado
    async eliminarEstado(id) {
        try {
            const response = await WebAPI.Instance().delete(`/Varios/EliminarEstado/${id}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al eliminar estado:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }
}

export default new EstadosRemitoService(); 