import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lista: [
    {
      numeroRemito: "00001",
      estado: 'en_preparacion',
      fechaEmision: '2024-03-24',
      destino: 'Sucursal BA-135',
      razonSocial: 'Metalúrgica del Oeste S.A.',
      cuit: '37-84658263-0',
      tipoCliente: 'empresa privada',
      peso: '59.910',
      volumen: '7.65',
      valor: '72300000',
      categoria: 'metalurgica',
      pallets: '12',
      racks: '0',
      bultos: '45',
      tambores: '0',
      bobinas: '8',
      requiereRefrigeracion: false,
      observaciones: 'Entregar en horario comercial. Manipular con cuidado.',
      documentacion: '',
    },
    {
      numeroRemito: "00002",
      estado: 'pendiente',
      fechaEmision: '2024-03-24',
      destino: 'Depósito Central Córdoba',
      razonSocial: 'Química Industrial S.R.L.',
      cuit: '30-71234567-8',
      tipoCliente: 'empresa privada',
      peso: '850.500',
      volumen: '12.30',
      valor: '1450000',
      categoria: 'quimica',
      pallets: '4',
      racks: '0',
      bultos: '0',
      tambores: '16',
      bobinas: '0',
      requiereRefrigeracion: true,
      observaciones: 'Material peligroso. Requiere manipulación especial.',
      documentacion: '',
    },
    {
      numeroRemito: "00003",
      estado: 'entregado',
      fechaEmision: '2024-03-23',
      destino: 'Centro Logístico Rosario',
      razonSocial: 'Alimentos del Sur S.A.',
      cuit: '33-65432198-9',
      tipoCliente: 'empresa privada',
      peso: '1200.000',
      volumen: '15.75',
      valor: '2800000',
      categoria: 'alimentos',
      pallets: '20',
      racks: '5',
      bultos: '150',
      tambores: '0',
      bobinas: '0',
      requiereRefrigeracion: true,
      observaciones: 'Mantener cadena de frío. Prioridad alta.',
      documentacion: '',
    },
    {
      numeroRemito: "00004",
      estado: 'en_transito',
      fechaEmision: '2024-03-24',
      destino: 'Terminal Portuaria Buenos Aires',
      razonSocial: 'Exportadora Argentina S.A.',
      cuit: '30-98765432-1',
      tipoCliente: 'empresa privada',
      peso: '2500.000',
      volumen: '25.00',
      valor: '5600000',
      categoria: 'metalurgica',
      pallets: '30',
      racks: '10',
      bultos: '200',
      tambores: '0',
      bobinas: '15',
      requiereRefrigeracion: false,
      observaciones: 'Carga para exportación. Documentación aduanera adjunta.',
      documentacion: '',
    },
    {
      numeroRemito: "00005",
      estado: 'retenido',
      fechaEmision: '2025-03-23',
      destino: 'Planta San Luis',
      razonSocial: 'Industrias Químicas del Oeste',
      cuit: '33-12345678-9',
      tipoCliente: 'empresa privada',
      peso: '750.000',
      volumen: '8.50',
      valor: '980000',
      categoria: 'quimica',
      pallets: '8',
      racks: '0',
      bultos: '0',
      tambores: '25',
      bobinas: '0',
      requiereRefrigeracion: true,
      observaciones: 'Retenido por inspección de calidad.',
      documentacion: '',
    },
    {
      numeroRemito: "00006",
      estado: 'cancelado',
      fechaEmision: '2024-03-22',
      destino: 'Centro Distribución Mendoza',
      razonSocial: 'Bebidas Cuyo S.A.',
      cuit: '30-87654321-0',
      tipoCliente: 'empresa privada',
      peso: '1800.000',
      volumen: '20.00',
      valor: '3200000',
      categoria: 'alimentos',
      pallets: '25',
      racks: '0',
      bultos: '300',
      tambores: '0',
      bobinas: '0',
      requiereRefrigeracion: true,
      observaciones: 'Cancelado por cliente. Reprogramar entrega.',
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
      state.lista = state.lista.filter(r => r.numeroRemito !== action.payload);
    },
    seleccionarRemito(state, action) {
      state.seleccionado = action.payload;
    },
    limpiarSeleccion(state) {
      state.seleccionado = null;
    },
    actualizarRemito(state, action) {
      const index = state.lista.findIndex(r => r.numeroRemito === action.payload.numeroRemito);
      if (index !== -1) {
        state.lista[index] = action.payload;
      }
    },
  },
});

export const {
  agregarRemito,
  eliminarRemito,
  seleccionarRemito,
  limpiarSeleccion,
  actualizarRemito,
} = remitosSlice.actions;

export const selectRemitos = (state) => state.remitos.lista;
export const selectRemitoSeleccionado = (state) => state.remitos.seleccionado;

export default remitosSlice.reducer;
