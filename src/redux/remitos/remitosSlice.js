import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [
    {
      estado: 'en_preparacion',
      fechaEmision: '2025-10-24',
      destino: 'Sucursal BA-135',
      razonSocial: 'Metalúrgica del Oeste S.A.',
      cuit: '37-84658263-0',
      tipoCliente: 'empresa privada',
      peso: '59.910',
      volumen: '7.65',
      valor: '72300000',
      categoria: 'metalurgica',
      pallets: '0',
      racks: '0',
      bultos: '0',
      tambores: '0',
      bobinas: '0',
      requiereRefrigeracion: true,
      observaciones: 'Entregar en horario comercial. Manipular con cuidado.',
      documentacion: '',
    }
  ],
  seleccionado: null,
};

const remitosSlice = createSlice({
  name: 'remitos',
  initialState,
  reducers: {
    agregarRemito(state, action) {
      state.lista.push(action.payload);
    },
    eliminarRemito(state, action) {
      state.lista = state.lista.filter(r => r.id !== action.payload);
    },
    seleccionarRemito(state, action) {
      state.seleccionado = action.payload;
    },
    limpiarSeleccion(state) {
      state.seleccionado = null;
    },
  },
});

export const {
  agregarRemito,
  eliminarRemito,
  seleccionarRemito,
  limpiarSeleccion,
} = remitosSlice.actions;

export const selectRemitos = (state) => state.remitos.lista;

export default remitosSlice.reducer;
