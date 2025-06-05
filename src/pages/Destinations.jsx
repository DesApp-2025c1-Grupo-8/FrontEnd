import React, { useState, useMemo } from "react";

import { Box, Button, Typography, Pagination } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector } from "react-redux";
import { selectDestinos } from "../redux/destinos/destinosSlice";

import ModalDestino from "../components/ModalDestino";
import DestinoCard from "../components/DestinoCard";
import SearchBar from "../components/SearchBar";

function Destinations() {
  const destinos = useSelector(selectDestinos);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCopy = (row) => {
    const {
      calle = "",
      altura = "",
      municipio = "",
      localidad = "",
      codigo_postal = "",
      provincia = "",
      pais = "",
    } = row;

    const direccionFormateada =
      `${calle}, ${altura}, ${municipio}, ${localidad}, CP:${codigo_postal}, ${provincia}, ${pais}`.trim();

    navigator.clipboard
      .writeText(direccionFormateada)
      .then(() => {
        alert("Dirección copiada al portapapeles.");
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
        alert("No se pudo copiar la dirección.");
      });
  };

  const handleDelete = (row) => alert(`Eliminar destino: ${row.id}`);

  const destinosFiltrados = useMemo(() => {
    if (!searchTerm) return destinos;

    const lowerSearch = searchTerm.toLowerCase();
    return destinos.filter((destino) =>
      Object.values(destino).some((valor) =>
        String(valor).toLowerCase().includes(lowerSearch)
      )
    );
  }, [destinos, searchTerm]);

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

  const [open, setOpen] = useState(false); // Controla si el modal está abierto
  const [modo, setModo] = useState("alta"); // Modo del modal (alta, modificación, consulta)
  const [destino, setDestino] = useState(null); // Datos del destino seleccionado

  const handleAdd = () => {
    setModo("alta");
    setDestino(null);
    setOpen(true);
  };

  const handleEdit = (destinoEjemplo) => {
    setModo("modificacion");
    setDestino(destinoEjemplo);
    setOpen(true);
  };

  const handleView = (destinoEjemplo) => {
    setModo("consulta");
    setDestino(destinoEjemplo);
    setOpen(true);
  };

  
  const totalPages = Math.ceil(destinosFiltrados.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const destinosPaginados = destinosFiltrados.slice(startIndex, startIndex + itemsPerPage);

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
        Gestión de Destinos
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{flexDirection: { xs: 'column', sm: 'row' }, gap:{ xs: 2, sm: 0 }}}>
        <Box display="flex" gap={2} sx={{flexDirection: { xs: 'column', sm: 'row' } }}>
          <SearchBar
            placeholder="Buscar destino"
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
          Nuevo Destino
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {destinosPaginados.map((destino) => (
          <DestinoCard
            key={destino.id}
            destino={destino}
            onView={handleView}
            onEdit={handleEdit}
            onCopy={handleCopy}
            onDelete={handleDelete}
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

      <ModalDestino
        open={open}
        onClose={() => setOpen(false)}
        modo={modo}
        destino={destino}
      />
    </Box>
  );
}

export default Destinations;
