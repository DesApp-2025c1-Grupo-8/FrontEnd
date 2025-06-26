import React, { useState, useMemo } from "react";
import { Box, Button, Typography, Pagination } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector, useDispatch } from "react-redux";
import { selectEstadosRemito } from "../redux/estadosRemito/estadosRemitoSlice";
import { selectCategorias } from "../redux/categorias/categoriasSlice";
import { eliminarEstadoRemito } from "../redux/estadosRemito/estadosRemitoSlice";
import { borrarCategoria } from "../redux/categorias/categoriasSlice";

import ModalEstadosRemito from "../components/ModalEstadosRemito";
import ModalCategoria from "../components/ModalCategoria";
import EstadoCard from "../components/EstadoCard";
import CategoriaCard from "../components/CategoriaCard";
import SearchBar from "../components/SearchBar";

function Varios() {
  const estados = useSelector(selectEstadosRemito);
  const categorias = useSelector(selectCategorias);
  const dispatch = useDispatch();

  // Estados - paginación y búsqueda
  const [pageEstados, setPageEstados] = useState(1);
  const itemsPerPageEstados = 3;
  const [searchInputEstados, setSearchInputEstados] = useState("");
  const [searchTermEstados, setSearchTermEstados] = useState("");

  const estadosFiltrados = useMemo(() => {
    if (!searchTermEstados) return estados;

    const lowerSearch = searchTermEstados.toLowerCase();
    return estados.filter((estado) =>
      Object.values(estado).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [estados, searchTermEstados]);

  const handleBuscarEstados = () => {
    setSearchTermEstados(searchInputEstados.trim());
    setPageEstados(1); // Resetear página al buscar
  };

  const handleKeyDownEstados = (e) => {
    if (e.key === "Enter") {
      setSearchTermEstados(searchInputEstados.trim());
      setPageEstados(1); // Resetear página al buscar
    }
  };

  // Calcular paginación para Estados
  const totalPagesEstados = Math.ceil(
    estadosFiltrados.length / itemsPerPageEstados
  );
  const startIndexEstados = (pageEstados - 1) * itemsPerPageEstados;
  const estadosPaginados = estadosFiltrados.slice(
    startIndexEstados,
    startIndexEstados + itemsPerPageEstados
  );

  const handleChangePageEstados = (event, newPage) => {
    setPageEstados(newPage);
  };

  // Modal Estados
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("alta");
  const [estado, setEstado] = useState(null);

  const handleAdd = () => {
    setModo("alta");
    setEstado(null);
    setOpen(true);
  };

  const handleEdit = (estadoSeleccionado) => {
    setModo("modificacion");
    setEstado(estadoSeleccionado);
    setOpen(true);
  };

  const handleView = (estadoSeleccionado) => {
    setModo("consulta");
    setEstado(estadoSeleccionado);
    setOpen(true);
  };

  // Nuevo handler de borrar: abre el modal en modo consulta
  const handleDelete = (estadoSeleccionado) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el estado "${estadoSeleccionado.nombre}"?`)) {
      dispatch(eliminarEstadoRemito(estadoSeleccionado.id));
    }
  };

  // Categorías - paginación y búsqueda
  const [pageCategorias, setPageCategorias] = useState(1);
  const itemsPerPageCategorias = 3;
  const [searchInputCategorias, setSearchInputCategorias] = useState("");
  const [searchTermCategorias, setSearchTermCategorias] = useState("");

  const categoriasFiltradas = useMemo(() => {
    if (!searchTermCategorias) return categorias;

    const lowerSearch = searchTermCategorias.toLowerCase();
    return categorias.filter((categoria) =>
      Object.values(categoria).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [categorias, searchTermCategorias]);

  const handleBuscarCategorias = () => {
    setSearchTermCategorias(searchInputCategorias.trim());
    setPageCategorias(1); // Resetear página al buscar
  };

  const handleKeyDownCategorias = (e) => {
    if (e.key === "Enter") {
      setSearchTermCategorias(searchInputCategorias.trim());
      setPageCategorias(1); // Resetear página al buscar
    }
  };

  // Calcular paginación para Categorías
  const totalPagesCategorias = Math.ceil(
    categoriasFiltradas.length / itemsPerPageCategorias
  );
  const startIndexCategorias = (pageCategorias - 1) * itemsPerPageCategorias;
  const categoriasPaginadas = categoriasFiltradas.slice(
    startIndexCategorias,
    startIndexCategorias + itemsPerPageCategorias
  );

  const handleChangePageCategorias = (event, newPage) => {
    setPageCategorias(newPage);
  };

  const handleDeleteCat = (categoriaSeleccionada) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoriaSeleccionada.nombre}"?`)) {
      dispatch(borrarCategoria(categoriaSeleccionada.id));
    }
  };

  // Modal Categoría
  const [openCat, setOpenCat] = useState(false);
  const [modoCat, setModoCat] = useState("alta");
  const [categoria, setCategoria] = useState(null);

  const handleAddCat = () => {
    setModoCat("alta");
    setCategoria(null);
    setOpenCat(true);
  };

  const handleEditCat = (categoriaSeleccionada) => {
    setModoCat("modificacion");
    setCategoria(categoriaSeleccionada);
    setOpenCat(true);
  };

  const handleViewCat = (categoriaSeleccionada) => {
    setModoCat("consulta");
    setCategoria(categoriaSeleccionada);
    setOpenCat(true);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} bgcolor="#F4FFF8" p={2}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography
          variant="h2"
          sx={{
            color: "black",
            borderBottom: "3px solid #4D4847",
            width: "fit-content",
          }}
        >
          Gestión de Estados
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 2 },
          }}
        >
          <Box
            display="flex"
            gap={2}
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <SearchBar
              placeholder="Buscar estado"
              value={searchInputEstados}
              onChange={(e) => setSearchInputEstados(e.target.value)}
              onKeyDown={handleKeyDownEstados}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleBuscarEstados}
            >
              Buscar
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAdd}
          >
            Nuevo Estado
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {estadosPaginados.map((estado) => (
            <EstadoCard
              key={estado.id}
              estado={estado}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Box>

        {totalPagesEstados > 1 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPagesEstados}
              page={pageEstados}
              onChange={handleChangePageEstados}
              color="primary"
              size="medium"
            />
          </Box>
        )}

        <ModalEstadosRemito
          open={open}
          onClose={() => setOpen(false)}
          modo={modo}
          estadoRemito={estado}
        />
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        <Typography
          variant="h2"
          sx={{
            color: "black",
            borderBottom: "3px solid #4D4847",
            width: "fit-content",
          }}
        >
          Gestión de Categorías
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 2 },
          }}
        >
          <Box
            display="flex"
            gap={2}
            sx={{ flexDirection: { xs: "column", sm: "row" } }}
          >
            <SearchBar
              placeholder="Buscar categoría"
              value={searchInputCategorias}
              onChange={(e) => setSearchInputCategorias(e.target.value)}
              onKeyDown={handleKeyDownCategorias}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleBuscarCategorias}
            >
              Buscar
            </Button>
          </Box>

          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAddCat}
          >
            Nueva Categoría
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {categoriasPaginadas.map((categoria) => (
            <CategoriaCard
              key={categoria.id}
              categoria={categoria}
              onView={handleViewCat}
              onEdit={handleEditCat}
              onDelete={handleDeleteCat}
            />
          ))}
        </Box>

        {totalPagesCategorias > 1 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPagesCategorias}
              page={pageCategorias}
              onChange={handleChangePageCategorias}
              color="primary"
              size="medium"
            />
          </Box>
        )}

        <ModalCategoria
          open={openCat}
          onClose={() => setOpenCat(false)}
          modo={modoCat}
          categoria={categoria}
        />
      </Box>
    </Box>
  );
}

export default Varios;
