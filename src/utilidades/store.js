import { configureStore } from '@reduxjs/toolkit';
import remitosReducer from '../redux/remitos/remitosSlice';
import clientesReducer from '../redux/clientes/clientesSlice';
import destinosReducer from '../redux/destinos/destinosSlice';
import mercaderiaReducer from '../redux/mercaderia/mercaderiaSlice';
import reportesReducer from '../redux/reportes/reportesSlice';

export const store = configureStore({
  reducer: {
    remitos: remitosReducer,
    clientes: clientesReducer,
    destinos: destinosReducer,
    mercaderia: mercaderiaReducer,
    reportes: reportesReducer,
  },
});

