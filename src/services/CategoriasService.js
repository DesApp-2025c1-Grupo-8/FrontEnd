import WebAPI from './config/WebAPI.js';

class CategoriasService {
    // Obtener todas las categorías
    static async obtenerCategorias() {
        try {
            const response = await WebAPI.Instance().get('/Categoria/All');
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener categorías:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Obtener una categoría por ID
    static async obtenerCategoriaPorId(id) {
        try {
            const response = await WebAPI.Instance().get(`/Categoria/get/${id}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al obtener categoría por ID:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Crear nueva categoría
    static async crearCategoria(categoria) {
        try {
            const response = await WebAPI.Instance().post('/Categoria/Create', categoria);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al crear categoría:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Actualizar categoría
    static async actualizarCategoria(id, categoria) {
        try {
            const response = await WebAPI.Instance().put(`/Categoria/update/${id}`, categoria);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al actualizar categoría:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }

    // Eliminar categoría
    static async eliminarCategoria(id) {
        try {
            const response = await WebAPI.Instance().delete(`/Categoria/Delete/${id}`);
            return { data: response.data, error: null };
        } catch (error) {
            console.error('Error al eliminar categoría:', error);
            return {
                data: null,
                error: error.response?.data || error.message
            };
        }
    }
}

export default CategoriasService; 