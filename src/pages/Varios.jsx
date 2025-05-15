import React, { useState, useMemo } from "react";
import { Box, Button, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectEstadosRemito } from "../redux/estadosRemito/estadosRemitoSlice";
import { selectCategorias } from "../redux/categorias/categoriasSlice";

import ModalEstadosRemito from "../components/ModalEstadosRemito";
import ModalCategoria from "../components/ModalCategoria";
import TableComponent from "../components/TableComponent";
import SearchBar from "../components/SearchBar";

function Varios() {
  const estados = useSelector(selectEstadosRemito);
  const categorias = useSelector(selectCategorias);

  // Estados búsqueda
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
  };

  const handleKeyDownEstados = (e) => {
    if (e.key === "Enter") {
      setSearchTermEstados(searchInputEstados.trim());
    }
  };

  const columnas = estados.length > 0 ? Object.keys(estados[0]) : [];

  const handleCopy = (row) => alert(`Copiar estado: ${row.IUC}`);
  const handleDelete = (row) => alert(`Eliminar estado: ${row.IUC}`);

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

  // Categorías búsqueda
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
  };

  const handleKeyDownCategorias = (e) => {
    if (e.key === "Enter") {
      setSearchTermCategorias(searchInputCategorias.trim());
    }
  };

  const handleDeleteCat = (row) => alert(`Eliminar categoria: ${row.id}`);

  const columnasCat = categorias.length > 0 ? Object.keys(categorias[0]) : [];

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
      {/* Gestión de Estados */}
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

        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={2}>
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

        <TableComponent
          columnas={columnas}
          filas={estadosFiltrados}
          onView={handleView}
          onEdit={handleEdit}
          onCopy={handleCopy}
          onDelete={handleDelete}
          EditIconVisible={true}
          DeleteIconVisible={true}
        />

        <ModalEstadosRemito
          open={open}
          onClose={() => setOpen(false)}
          modo={modo}
          estadoRemito={estado}
        />
      </Box>

      {/* Gestión de Categorías */}
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

        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={2}>
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

        <TableComponent
          columnas={columnasCat}
          filas={categoriasFiltradas}
          onView={handleViewCat}
          onEdit={handleEditCat}
          onDelete={handleDeleteCat}
          EditIconVisible={true}
          DeleteIconVisible={true}
        />

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
