import WebAPI from './config/WebAPI.js';

class RemitosService {
    // Obtener todos los remitos
    static async obtenerRemitos() {
        try {
            const response = await WebAPI.Instance().get('/Remito/All');
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener remitos:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Obtener un remito por número
    static async obtenerRemitoPorNumero(numeroRemito) {
        try {
            const response = await WebAPI.Instance().get(`/Remito/ObtenerRemito/${numeroRemito}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener remito por número:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Crear nuevo remito
    static async crearRemito(remito) {
        try {
            const response = await WebAPI.Instance().post('/Remito/CrearRemito', remito);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al crear remito:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Actualizar remito
    static async actualizarRemito(numeroRemito, remito) {
        try {
            const response = await WebAPI.Instance().put(`/Remito/ActualizarRemito/${numeroRemito}`, remito);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al actualizar remito:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Eliminar remito
    static async eliminarRemito(numeroRemito) {
        try {
            const response = await WebAPI.Instance().delete(`/Remito/EliminarRemito/${numeroRemito}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al eliminar remito:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Buscar remitos con filtros
    static async buscarRemitos(filtros) {
        try {
            const response = await WebAPI.Instance().post('/Remito/BuscarRemitos', filtros);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al buscar remitos:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Descargar remito (PDF)
    static async descargarRemito(numeroRemito) {
        try {
            const response = await WebAPI.Instance().get(`/Remito/DescargarRemito/${numeroRemito}`, {
                responseType: 'blob'
            });
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al descargar remito:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }
}

export default RemitosService; 