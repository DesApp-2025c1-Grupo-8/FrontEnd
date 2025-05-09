import React, { useState } from 'react';
import Tabla from '../components/Tabla';
import Titulo from '../components/Titulo';
import BotonAgregar from '../components/BotonAgregar';
import { Box } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { selectCategorias, borrarCategoria } from '../redux/categorias/categoriasSlice';
import { selectEstadosRemito, eliminarEstadoRemito } from '../redux/estadosRemito/estadosRemitoSlice';

function Varios() {
  // Estado para categorías
  const [cantidadCat, setCantidadCat] = useState(10);
  const [paginaCat, setPaginaCat] = useState(1);
  const inicioCat = (paginaCat - 1) * cantidadCat;
  const finCat = inicioCat + cantidadCat;
  
  const categorias = useSelector(selectCategorias);
  const datosPaginaCat = categorias.slice(inicioCat, finCat);

  // Estado para estados de remito
  const [cantidadEst, setCantidadEst] = useState(10);
  const [paginaEst, setPaginaEst] = useState(1);
  const inicioEst = (paginaEst - 1) * cantidadEst;
  const finEst = inicioEst + cantidadEst;
  
  const estadosRemito = useSelector(selectEstadosRemito);
  const datosPaginaEst = estadosRemito.slice(inicioEst, finEst);

  const dispatch = useDispatch();

  const handleEdit = (item) => {
    alert("se edita el item: " + item.id);
  };

  const handleDelete = (item, tipo) => {
    const confirm = window.confirm("¿Está seguro de querer eliminar este item?");
    if (confirm) {
      if (tipo === 'categoria') {
        dispatch(borrarCategoria(item.id));
      } else if (tipo === 'estado') {
        dispatch(eliminarEstadoRemito(item.id));
      }
    }
  };

  const handleSearch = (item) => {
    alert("aca se visualiza el item");
  };

  const handleAgregarCategoria = () => {
    alert("Aquí se abrirá el formulario para agregar una nueva categoría");
  };

  const handleAgregarEstado = () => {
    alert("Aquí se abrirá el formulario para agregar un nuevo estado de remito");
  };

  return (
    <div>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Titulo>Categorías de mercadería</Titulo>
        <BotonAgregar 
          texto="Agregar Categoría" 
          onClick={handleAgregarCategoria}
        />
      </Box>
      <section>
        <Tabla 
          datos={datosPaginaCat} 
          onSearch={handleSearch} 
          onEdit={handleEdit} 
          onDelete={(item) => handleDelete(item, 'categoria')} 
        />
      </section>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        mt: 4
      }}>
        <Titulo>Estados de remito</Titulo>
        <BotonAgregar 
          texto="Agregar Estado" 
          onClick={handleAgregarEstado}
        />
      </Box>
      <section>
        <Tabla 
          datos={datosPaginaEst} 
          onSearch={handleSearch} 
          onEdit={handleEdit} 
          onDelete={(item) => handleDelete(item, 'estado')} 
        />
      </section>
    </div>
  );
}

export default Varios;