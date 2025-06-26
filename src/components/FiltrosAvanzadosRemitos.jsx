import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Typography,
  Grid,
  Collapse,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Chip,
  IconButton,
  Tooltip,
  InputAdornment,
  Stack,
} from "@mui/material";
import {
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";

// Estados disponibles
const estadosRemito = [
  { value: "en_preparacion", label: "En preparación" },
  { value: "autorizado", label: "Autorizado" },
  { value: "retenido", label: "Retenido" },
  { value: "pendiente", label: "Pendiente" },
  { value: "en_transito", label: "En tránsito" },
  { value: "entregado", label: "Entregado" },
  { value: "cancelado", label: "Cancelado" },
];

// Provincias de Argentina
const provincias = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

function FiltrosAvanzadosRemitos({ filtros, onFiltrosChange, onLimpiarFiltros }) {
  const [expanded, setExpanded] = useState(false);

  const handleFiltroChange = (campo, valor) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor,
    });
  };

  const handleContenidoChange = (campo) => {
    onFiltrosChange({
      ...filtros,
      contenido: {
        ...filtros.contenido,
        [campo]: !filtros.contenido[campo],
      },
    });
  };

  const limpiarFiltros = () => {
    const filtrosLimpios = {
      numeroRemito: "",
      numeroRemitoDesde: "",
      numeroRemitoHasta: "",
      cliente: "",
      valorDesde: "",
      valorHasta: "",
      provinciaOrigen: "",
      provinciaDestino: "",
      estado: "",
      fechaDesde: "",
      fechaHasta: "",
      contenido: {
        pallets: false,
        bultos: false,
        racks: false,
        bobinas: false,
        tambores: false,
      },
    };
    onFiltrosChange(filtrosLimpios);
    onLimpiarFiltros();
  };

  // Contar filtros activos
  const filtrosActivos = Object.values(filtros).filter(valor => {
    if (typeof valor === 'string') return valor !== '';
    if (typeof valor === 'object') {
      return Object.values(valor).some(v => v === true);
    }
    return false;
  }).length;

  return (
    <Box>
      {/* Chips de filtros activos */}
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
        {filtros.numeroRemito && (
          <Chip label={`Remito: ${filtros.numeroRemito}`} onDelete={() => handleFiltroChange("numeroRemito", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.numeroRemitoDesde && (
          <Chip label={`Remito desde: ${filtros.numeroRemitoDesde}`} onDelete={() => handleFiltroChange("numeroRemitoDesde", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.numeroRemitoHasta && (
          <Chip label={`Remito hasta: ${filtros.numeroRemitoHasta}`} onDelete={() => handleFiltroChange("numeroRemitoHasta", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.cliente && (
          <Chip label={`Cliente: ${filtros.cliente}`} onDelete={() => handleFiltroChange("cliente", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.valorDesde && (
          <Chip label={`Valor desde: $${Number(filtros.valorDesde).toLocaleString()}`} onDelete={() => handleFiltroChange("valorDesde", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.valorHasta && (
          <Chip label={`Valor hasta: $${Number(filtros.valorHasta).toLocaleString()}`} onDelete={() => handleFiltroChange("valorHasta", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.provinciaOrigen && (
          <Chip label={`Origen: ${filtros.provinciaOrigen}`} onDelete={() => handleFiltroChange("provinciaOrigen", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.provinciaDestino && (
          <Chip label={`Destino: ${filtros.provinciaDestino}`} onDelete={() => handleFiltroChange("provinciaDestino", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.estado && (
          <Chip label={`Estado: ${estadosRemito.find(e => e.value === filtros.estado)?.label || filtros.estado}`} onDelete={() => handleFiltroChange("estado", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.fechaDesde && (
          <Chip label={`Fecha desde: ${filtros.fechaDesde}`} onDelete={() => handleFiltroChange("fechaDesde", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {filtros.fechaHasta && (
          <Chip label={`Fecha hasta: ${filtros.fechaHasta}`} onDelete={() => handleFiltroChange("fechaHasta", "")} size="small"
            sx={{
              backgroundColor: '#008893',
              color: 'white',
              fontWeight: 500,
              borderRadius: '8px',
              '.MuiChip-deleteIcon': { color: 'white' },
              '&:hover': { backgroundColor: '#006d73' },
            }}
          />
        )}
        {Object.entries(filtros.contenido).map(([key, value]) =>
          value ? (
            <Chip
              key={key}
              label={`Con ${key}`}
              onDelete={() => handleContenidoChange(key)}
              size="small"
              sx={{
                backgroundColor: '#008893',
                color: 'white',
                fontWeight: 500,
                borderRadius: '8px',
                '.MuiChip-deleteIcon': { color: 'white' },
                '&:hover': { backgroundColor: '#006d73' },
              }}
            />
          ) : null
        )}
      </Stack>
      <Card sx={{ mb: 1 }}>
        <CardContent sx={{ p: expanded ? 2 : 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={expanded ? 1 : 0}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                cursor: 'pointer',
                userSelect: 'none',
                px: expanded ? 1 : 0.5,
                py: expanded ? 0.5 : 0.25,
                borderRadius: '6px',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(0, 136, 147, 0.08)',
                },
              }}
              onClick={() => setExpanded((prev) => !prev)}
            >
              <FilterListIcon
                sx={{
                  color: '#008893',
                  fontSize: expanded ? 24 : 20,
                  transition: 'all 0.3s',
                  transform: expanded ? 'rotate(90deg)' : 'none',
                }}
              />
              <Typography
                variant={expanded ? "subtitle1" : "body2"}
                sx={{
                  color: '#008893',
                  fontWeight: 600,
                  ml: expanded ? 0.5 : 0.25,
                  fontSize: expanded ? '1rem' : '0.875rem',
                  letterSpacing: 0.3,
                  transition: 'all 0.2s',
                }}
              >
                Filtros
              </Typography>
            </Box>
            {filtrosActivos > 0 && (
              <Chip 
                label={`${filtrosActivos} filtro${filtrosActivos > 1 ? 's' : ''} activo${filtrosActivos > 1 ? 's' : ''}`}
                color="primary"
                size="small"
              />
            )}
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Collapse in={expanded}>
            <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
              {/* Primera fila: Número de remito, Cliente y Estado */}
              <Grid item xs={12}>
                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Número de remito"
                      value={filtros.numeroRemito}
                      onChange={(e) => handleFiltroChange("numeroRemito", e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="Ej: 00001"
                      InputProps={{
                        endAdornment: filtros.numeroRemito ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("numeroRemito", "")}
                            aria-label="Limpiar número de remito">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Cliente solicitante"
                      value={filtros.cliente}
                      onChange={(e) => handleFiltroChange("cliente", e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="Nombre o razón social"
                      InputProps={{
                        endAdornment: filtros.cliente ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("cliente", "")}
                            aria-label="Limpiar cliente solicitante">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <FormControl fullWidth size="small">
                      <InputLabel shrink>Estado actual</InputLabel>
                      <Select
                        value={filtros.estado}
                        onChange={(e) => handleFiltroChange("estado", e.target.value)}
                        label="Estado actual"
                        displayEmpty
                        renderValue={(selected) => {
                          if (selected === '') {
                            return <span style={{ color: '#999' }}>Seleccionar estado</span>;
                          }
                          return estadosRemito.find(e => e.value === selected)?.label || selected;
                        }}
                        endAdornment={
                          filtros.estado ? (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={() => handleFiltroChange("estado", "")}
                                aria-label="Limpiar estado actual">
                                <ClearIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ) : null
                        }
                      >
                        <MenuItem value="" disabled>
                          Seleccionar estado
                        </MenuItem>
                        {estadosRemito.map((estado) => (
                          <MenuItem key={estado.value} value={estado.value}>
                            {estado.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* Segunda fila: Remito desde y hasta */}
              <Grid item xs={12}>
                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Remito desde"
                      value={filtros.numeroRemitoDesde}
                      onChange={(e) => handleFiltroChange("numeroRemitoDesde", e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="00001"
                      InputProps={{
                        endAdornment: filtros.numeroRemitoDesde ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("numeroRemitoDesde", "")}
                            aria-label="Limpiar número de remito desde">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Remito hasta"
                      value={filtros.numeroRemitoHasta}
                      onChange={(e) => handleFiltroChange("numeroRemitoHasta", e.target.value)}
                      fullWidth
                      size="small"
                      placeholder="00010"
                      InputProps={{
                        endAdornment: filtros.numeroRemitoHasta ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("numeroRemitoHasta", "")}
                            aria-label="Limpiar número de remito hasta">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Tercera fila: Provincias */}
              <Grid item xs={12}>
                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel shrink>Provincia origen</InputLabel>
                      <Select
                        value={filtros.provinciaOrigen}
                        onChange={(e) => handleFiltroChange("provinciaOrigen", e.target.value)}
                        label="Provincia origen"
                        displayEmpty
                        endAdornment={
                          filtros.provinciaOrigen ? (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={() => handleFiltroChange("provinciaOrigen", "")}
                                aria-label="Limpiar provincia origen">
                                <ClearIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ) : null
                        }
                      >
                        <MenuItem value="">
                          <em>Todas las provincias</em>
                        </MenuItem>
                        {provincias.map((provincia) => (
                          <MenuItem key={provincia} value={provincia}>
                            {provincia}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel shrink>Provincia destino</InputLabel>
                      <Select
                        value={filtros.provinciaDestino}
                        onChange={(e) => handleFiltroChange("provinciaDestino", e.target.value)}
                        label="Provincia destino"
                        displayEmpty
                        endAdornment={
                          filtros.provinciaDestino ? (
                            <InputAdornment position="end">
                              <IconButton size="small" onClick={() => handleFiltroChange("provinciaDestino", "")}
                                aria-label="Limpiar provincia destino">
                                <ClearIcon fontSize="small" />
                              </IconButton>
                            </InputAdornment>
                          ) : null
                        }
                      >
                        <MenuItem value="">
                          <em>Todas las provincias</em>
                        </MenuItem>
                        {provincias.map((provincia) => (
                          <MenuItem key={provincia} value={provincia}>
                            {provincia}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {/* Cuarta fila: Valores */}
              <Grid item xs={12}>
                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Valor desde"
                      type="number"
                      value={filtros.valorDesde}
                      onChange={(e) => handleFiltroChange("valorDesde", e.target.value)}
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <AttachMoneyIcon sx={{ mr: 1, color: "text.secondary" }} />,
                        endAdornment: filtros.valorDesde ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("valorDesde", "")}
                            aria-label="Limpiar valor desde">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                      placeholder="0"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Valor hasta"
                      type="number"
                      value={filtros.valorHasta}
                      onChange={(e) => handleFiltroChange("valorHasta", e.target.value)}
                      fullWidth
                      size="small"
                      InputProps={{
                        startAdornment: <AttachMoneyIcon sx={{ mr: 1, color: "text.secondary" }} />,
                        endAdornment: filtros.valorHasta ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("valorHasta", "")}
                            aria-label="Limpiar valor hasta">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                      placeholder="1000000"
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Quinta fila: Fechas */}
              <Grid item xs={12}>
                <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Fecha desde"
                      type="date"
                      value={filtros.fechaDesde}
                      onChange={(e) => handleFiltroChange("fechaDesde", e.target.value)}
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: filtros.fechaDesde ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("fechaDesde", "")}
                            aria-label="Limpiar fecha desde">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Fecha hasta"
                      type="date"
                      value={filtros.fechaHasta}
                      onChange={(e) => handleFiltroChange("fechaHasta", e.target.value)}
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: filtros.fechaHasta ? (
                          <IconButton size="small" onClick={() => handleFiltroChange("fechaHasta", "")}
                            aria-label="Limpiar fecha hasta">
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        ) : null
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Sexta fila: Contenido específico */}
              <Grid item xs={12}>
                <Box sx={{ 
                  borderTop: '1px solid #e0e0e0', 
                  pt: { xs: 1.5, sm: 2 }, 
                  mt: { xs: 0.5, sm: 1 },
                  backgroundColor: '#fafafa',
                  borderRadius: 1,
                  p: { xs: 1, sm: 1.5 }
                }}>
                  <Typography variant="body2" color="primary" mb={{ xs: 0.5, sm: 1 }} sx={{ fontWeight: 600 }}>
                    Contenido específico:
                  </Typography>
                  <FormGroup 
                    row 
                    sx={{ 
                      gap: { xs: 1, sm: 2 },
                      flexDirection: { xs: 'column', sm: 'row' },
                      '& .MuiFormControlLabel-root': {
                        minWidth: { xs: 'auto', sm: '120px' }
                      }
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filtros.contenido.pallets}
                          onChange={() => handleContenidoChange("pallets")}
                          size="small"
                        />
                      }
                      label="Con pallets"
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filtros.contenido.bultos}
                          onChange={() => handleContenidoChange("bultos")}
                          size="small"
                        />
                      }
                      label="Con bultos"
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filtros.contenido.racks}
                          onChange={() => handleContenidoChange("racks")}
                          size="small"
                        />
                      }
                      label="Con racks"
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filtros.contenido.bobinas}
                          onChange={() => handleContenidoChange("bobinas")}
                          size="small"
                        />
                      }
                      label="Con bobinas"
                      sx={{ mr: 0 }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={filtros.contenido.tambores}
                          onChange={() => handleContenidoChange("tambores")}
                          size="small"
                        />
                      }
                      label="Con tambores"
                      sx={{ mr: 0 }}
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
}

export default FiltrosAvanzadosRemitos; 