import React, { useState, useMemo } from "react";
import { Box, Button, Typography, Grid, Pagination } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectRemitos } from "../redux/remitos/remitosSlice";

import ModalRemito from "../components/ModalRemito";
import RemitoCard from "../components/RemitoCard";
import SearchBar from "../components/SearchBar";

function Documents() {
  const remitos = useSelector(selectRemitos);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (remito) =>
    alert(`Eliminar remito: ${remito.numeroRemito}`);
  const handleDownload = (remito) =>
    alert(`Descargar remito: ${remito.numeroRemito}`);

  const remitosFiltrados = useMemo(() => {
    if (!searchTerm) return remitos;

    const lowerSearch = searchTerm.toLowerCase();
    return remitos.filter((remito) =>
      Object.values(remito).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [remitos, searchTerm]);

  const handleBuscarClick = () => {
    setSearchTerm(searchInput.trim());
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }
  };

  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("alta");
  const [remito, setRemito] = useState(null);

  const handleAdd = () => {
    setModo("alta");
    setRemito(null);
    setOpen(true);
  };

  const handleEdit = (remitoSeleccionado) => {
    setModo("modificacion");
    setRemito(remitoSeleccionado);
    setOpen(true);
  };

  const handleView = (remitoSeleccionado) => {
    setModo("consulta");
    setRemito(remitoSeleccionado);
    setOpen(true);
  };

  const totalPages = Math.ceil(remitosFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const remitosPaginados = remitosFiltrados.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} bgcolor="#F4FFF8" p={3}>
      <Typography
        variant="h2"
        sx={{
          color: "black",
          borderBottom: "3px solid #4D4847",
          width: "fit-content",
        }}
      >
        Gestión de Remitos
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Box
          display="flex"
          gap={2}
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <SearchBar
            placeholder="Buscar remito"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleBuscarClick}
          >
            Buscar
          </Button>
        </Box>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleAdd}
        >
          Nuevo Remito
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {remitosPaginados.map((remito) => (
          <RemitoCard
            remito={remito}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        ))}
      </Box>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </Box>
      )}

      <ModalRemito
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        remito={remito}
      />
    </Box>
  );
}

export default Documents;
