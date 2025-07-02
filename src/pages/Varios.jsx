import React, { useState, useMemo, useEffect } from "react";
import { Box, Button, Typography, Pagination, Tabs, Tab, Alert, CircularProgress } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import ModalEstadosRemito from "../components/ModalEstadosRemito";
import ModalCategoria from "../components/ModalCategoria";
import EstadoCard from "../components/EstadoCard";
import CategoriaCard from "../components/CategoriaCard";
import SearchBar from "../components/SearchBar";
import { useEstadosRemito } from "../hooks/useEstadosRemito";
import { useCategorias } from "../hooks/useCategorias";

function Varios() {
  // Usar los hooks personalizados
  const {
    estados,
    loading: estadosLoading,
    error: estadosError,
    cargarEstados,
    eliminarEstado
  } = useEstadosRemito();

  const {
    categorias,
    loading: categoriasLoading,
    error: categoriasError,
    cargarCategorias,
    eliminarCategoria
  } = useCategorias();

  // Cargar datos del backend al montar el componente
  useEffect(() => {
    console.log("🔄 Cargando datos del backend...");
    try {
      cargarEstados();
      cargarCategorias();
    } catch (error) {
      console.error("❌ Error al cargar datos:", error);
    }
  }, []);

  // Estados - paginación y búsqueda
  const [pageEstados, setPageEstados] = useState(1);
  const itemsPerPageEstados = 3;
  const [searchInputEstados, setSearchInputEstados] = useState("");
  const [searchTermEstados, setSearchTermEstados] = useState("");

  const estadosFiltrados = useMemo(() => {
    if (!searchTermEstados) return estados || [];

    const lowerSearch = searchTermEstados.toLowerCase();
    return (estados || []).filter((estado) =>
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

  // Nuevo handler de borrar: usa el hook
  const handleDelete = async (estadoSeleccionado) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el estado "${estadoSeleccionado.nombre}"?`)) {
      const result = await eliminarEstado(estadoSeleccionado.id);
      if (result.success) {
        console.log("Estado eliminado exitosamente");
      } else {
        console.error("Error al eliminar estado:", result.error);
      }
    }
  };

  // Categorías - paginación y búsqueda
  const [pageCategorias, setPageCategorias] = useState(1);
  const itemsPerPageCategorias = 3;
  const [searchInputCategorias, setSearchInputCategorias] = useState("");
  const [searchTermCategorias, setSearchTermCategorias] = useState("");

  const categoriasFiltradas = useMemo(() => {
    if (!searchTermCategorias) return categorias || [];

    const lowerSearch = searchTermCategorias.toLowerCase();
    return (categorias || []).filter((categoria) =>
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

  const handleDeleteCat = async (categoriaSeleccionada) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoriaSeleccionada.nombre}"?`)) {
      const result = await eliminarCategoria(categoriaSeleccionada.id);
      if (result.success) {
        console.log("Categoría eliminada exitosamente");
      } else {
        console.error("Error al eliminar categoría:", result.error);
      }
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

  const [tab, setTab] = useState(0);

  // Mostrar loading o error
  if (estadosLoading || categoriasLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={4} bgcolor="#F4FFF8" p={2}>
      {/* Mostrar errores si existen */}
      {estadosError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <strong>Error de conexión con el backend:</strong> {estadosError}
          <br />
          <small>Verifica que el backend esté corriendo en https://localhost:7265</small>
        </Alert>
      )}
      
      {categoriasError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <strong>Error de conexión con el backend:</strong> {categoriasError}
          <br />
          <small>Verifica que el backend esté corriendo en https://localhost:7265</small>
        </Alert>
      )}

      {/* Debug info */}
      <Alert severity="info" sx={{ mb: 2 }}>
        Estados: {estados?.length || 0} | Categorías: {categorias?.length || 0}
        {estadosError || categoriasError ? ' (Con errores de conexión)' : ''}
      </Alert>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Gestión de Estados" />
        <Tab label="Gestión de Categorías" />
      </Tabs>

      {tab === 0 && (
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
              disabled={!!estadosError}
            >
              Nuevo Estado
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {estadosError ? (
              <Alert severity="warning" sx={{ py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No se pueden cargar los estados
                </Typography>
                <Typography variant="body2">
                  El backend no está disponible. Verifica que el servidor esté corriendo en https://localhost:7265
                </Typography>
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={cargarEstados}
                >
                  Reintentar
                </Button>
              </Alert>
            ) : estadosPaginados.length > 0 ? (
              estadosPaginados.map((estado) => (
                <EstadoCard
                  key={estado.id}
                  estado={estado}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                {estadosLoading ? 'Cargando estados...' : 'No hay estados disponibles'}
              </Typography>
            )}
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
      )}

      {tab === 1 && (
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
              disabled={!!categoriasError}
            >
              Nueva Categoría
            </Button>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {categoriasError ? (
              <Alert severity="warning" sx={{ py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No se pueden cargar las categorías
                </Typography>
                <Typography variant="body2">
                  El backend no está disponible. Verifica que el servidor esté corriendo en https://localhost:7265
                </Typography>
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={cargarCategorias}
                >
                  Reintentar
                </Button>
              </Alert>
            ) : categoriasPaginadas.length > 0 ? (
              categoriasPaginadas.map((categoria) => (
                <CategoriaCard
                  key={categoria.id}
                  categoria={categoria}
                  onView={handleViewCat}
                  onEdit={handleEditCat}
                  onDelete={handleDeleteCat}
                />
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
                {categoriasLoading ? 'Cargando categorías...' : 'No hay categorías disponibles'}
              </Typography>
            )}
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
      )}
    </Box>
  );
}

export default Varios;
