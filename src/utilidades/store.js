import { configureStore } from '@reduxjs/toolkit';
import remitosReducer from '../redux/remitos/remitosSlice';
import clientesReducer from '../redux/clientes/clientesSlice';
import destinosReducer from '../redux/destinos/destinosSlice';
import mercaderiaReducer from '../redux/mercaderia/mercaderiaSlice';
import reportesReducer from '../redux/reportes/reportesSlice';
import categoriasReducer from '../redux/categorias/categoriasSlice';
import estadosRemitoReducer from '../redux/estadosRemito/estadosRemitoSlice';

export const store = configureStore({
  reducer: {
    remitos: remitosReducer,
    clientes: clientesReducer,
    destinos: destinosReducer,
    mercaderia: mercaderiaReducer,
    reportes: reportesReducer,
    categorias: categoriasReducer,
    estadosRemito: estadosRemitoReducer,
  },
});

