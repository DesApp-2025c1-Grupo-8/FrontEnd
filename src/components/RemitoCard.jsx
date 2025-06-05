import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Grid,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import ScaleIcon from "@mui/icons-material/Scale";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DescriptionIcon from "@mui/icons-material/Description";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";

function RemitoCard({ remito, onView, onEdit, onCopy, onDelete, onDownload }) {
  const getEstadoColor = (estado) => {
    switch (estado.toLowerCase()) {
      case "retenido":
        return "#f44336"; // Rojo
      case "pendiente":
        return "#ff9800"; // Naranja
      case "en_preparacion":
        return "#2196f3"; // Azul
      case "en_transito":
        return "#9c27b0"; // Púrpura
      case "entregado":
        return "#4caf50"; // Verde
      case "cancelado":
        return "#757575"; // Gris
      default:
        return "#757575"; // Gris por defecto
    }
  };

  const formatEstado = (estado) => {
    return estado
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR").format(value);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("es-AR");
  };

  const formatNumber = (value) => {
    if (!value) return "0";
    return new Intl.NumberFormat("es-AR").format(value);
  };

  const getTipoClienteColor = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "Privado":
        return "#1976d2";
      case "Estatal":
        return "#388e3c";
      case "Particular":
        return "#f57c00";
      default:
        return "#757575";
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "#f6fffa",
        "&:hover": {
          backgroundColor: "rgba(139, 170, 173, 0.15)",
          transition: "all 0.1s ease-in-out",
        },
        border: "1px solid #e0e0e0",
        borderTop: "none",
        "&:first-of-type": {
          borderTop: "1px solid #e0e0e0",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        },
        "&:last-of-type": {
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        },
        borderRadius: 0,
        boxShadow: "none",
        mb: 0,
        mt: 0,
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 80,
              height: 80,
              backgroundColor: "#e3f2fd",
              borderRadius: 2,
              border: "2px solid #0097a7",
            }}
          >
            <ReceiptIcon sx={{ color: "#0097a7", fontSize: "2rem", mb: 0.5 }} />
            <Typography variant="caption" sx={{ color: "#0097a7", fontWeight: "bold", fontSize: "0.7rem" }}>
              #{remito.numeroRemito || "N/A"}
            </Typography>
          </Box>

         
          <Box sx={{ flex: 1, minWidth: 0 }}>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: "bold", 
                    fontSize: "1.1rem", 
                    mb: 0.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  color="primary"
                >
                  {remito.razonSocial}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                    CUIT: {remito.cuit}
                  </Typography>
                  <Chip
                    icon={<PersonIcon sx={{ fontSize: "0.6rem" }} />}
                    label={remito.tipoCliente}
                    size="small"
                    sx={{
                      backgroundColor: getTipoClienteColor(remito.tipoCliente),
                      color: "white",
                      fontSize: "0.65rem",
                      height: 20,
                    }}
                  />
                </Box>
              </Box>
              <Chip
                label={formatEstado(remito.estado)}
                size="small"
                sx={{
                  backgroundColor: getEstadoColor(remito.estado),
                  color: "white",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  height: 26,
                  ml: 1,
                }}
              />
            </Box>

            
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ color: "#388e3c", fontWeight: "bold", fontSize: "0.7rem", mb: 0.3, display: "block" }}>
                  ENVÍO
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                  <LocalShippingIcon sx={{ fontSize: "0.9rem", color: "#388e3c" }} />
                  <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "0.85rem" }}>
                    {remito.destino}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarTodayIcon sx={{ fontSize: "0.8rem", color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                    {formatDate(remito.fechaEmision)}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ color: "#f57c00", fontWeight: "bold", fontSize: "0.7rem", mb: 0.3, display: "block" }}>
                  MERCADERÍA
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
                  <ScaleIcon sx={{ fontSize: "0.8rem", color: "text.secondary" }} />
                  <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                    <strong>{formatNumber(remito.peso)} kg</strong>
                  </Typography>
                  <AspectRatioIcon sx={{ fontSize: "0.8rem", color: "text.secondary", ml: 1 }} />
                  <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                    <strong>{formatNumber(remito.volumen)} m³</strong>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AttachMoneyIcon sx={{ fontSize: "0.8rem", color: "#f57c00" }} />
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "#f57c00", fontSize: "0.9rem" }}>
                    {formatCurrency(remito.valor)}
                  </Typography>
                  {remito.requiereRefrigeracion && (
                    <>
                      <AcUnitIcon sx={{ color: "#2196f3", fontSize: "0.8rem", ml: 1 }} />
                      <Typography variant="caption" color="#2196f3" sx={{ fontWeight: "bold", fontSize: "0.7rem" }}>
                        Frío
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="caption" sx={{ color: "#7b1fa2", fontWeight: "bold", fontSize: "0.7rem", mb: 0.3, display: "block" }}>
                  CANTIDADES
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}>
                  
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {remito.pallets > 0 && (
                      <Typography variant="caption" sx={{ fontSize: "0.75rem", backgroundColor: "#f5f5f5", px: 0.5, borderRadius: 0.5 }}>
                        <strong>P:</strong> {formatNumber(remito.pallets)}
                      </Typography>
                    )}
                    {remito.racks > 0 && (
                      <Typography variant="caption" sx={{ fontSize: "0.75rem", backgroundColor: "#f5f5f5", px: 0.5, borderRadius: 0.5 }}>
                        <strong>R:</strong> {formatNumber(remito.racks)}
                      </Typography>
                    )}
                    {remito.bultos > 0 && (
                      <Typography variant="caption" sx={{ fontSize: "0.75rem", backgroundColor: "#f5f5f5", px: 0.5, borderRadius: 0.5 }}>
                        <strong>B:</strong> {formatNumber(remito.bultos)}
                      </Typography>
                    )}
                    {remito.tambores > 0 && (
                      <Typography variant="caption" sx={{ fontSize: "0.75rem", backgroundColor: "#f5f5f5", px: 0.5, borderRadius: 0.5 }}>
                        <strong>T:</strong> {formatNumber(remito.tambores)}
                      </Typography>
                    )}
                    {remito.bobinas > 0 && (
                      <Typography variant="caption" sx={{ fontSize: "0.75rem", backgroundColor: "#f5f5f5", px: 0.5, borderRadius: 0.5 }}>
                        <strong>Bob:</strong> {formatNumber(remito.bobinas)}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CategoryIcon sx={{ fontSize: "0.8rem", color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", textTransform: "capitalize" }}>
                      {remito.categoria}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            
            {remito.observaciones && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#666", fontWeight: "bold", fontSize: "0.7rem", mb: 0.3, display: "block" }}>
                  OBSERVACIONES:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
                  <DescriptionIcon sx={{ fontSize: "0.9rem", color: "#666", flexShrink: 0, mt: 0.1 }} />
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: "0.8rem",
                      lineHeight: 1.3,
                      flex: 1,
                      wordBreak: "break-word",
                      display: { xs: "-webkit-box", sm: "block" },
                      WebkitLineClamp: { xs: 2, sm: 1 },
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {remito.observaciones}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 1 }}>
            <Tooltip title="Ver detalles">
              <IconButton 
                size="small" 
                onClick={() => onView(remito)}
                sx={{ 
                  backgroundColor: "#e3f2fd",
                  "&:hover": { backgroundColor: "#bbdefb" },
                  width: 32,
                  height: 32,
                }}
              >
                <VisibilityIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar">
              <IconButton 
                size="small" 
                onClick={() => onEdit(remito)}
                sx={{ 
                  backgroundColor: "#e8f5e8",
                  "&:hover": { backgroundColor: "#c8e6c9" },
                  width: 32,
                  height: 32,
                }}
              >
                <EditIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Copiar">
              <IconButton 
                size="small" 
                onClick={() => onCopy(remito)}
                sx={{ 
                  backgroundColor: "#fff3e0",
                  "&:hover": { backgroundColor: "#ffe0b2" },
                  width: 32,
                  height: 32,
                }}
              >
                <FileCopyIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton 
                size="small" 
                onClick={() => onDelete(remito)}
                sx={{ 
                  backgroundColor: "#ffebee",
                  "&:hover": { backgroundColor: "#ffcdd2" },
                  width: 32,
                  height: 32,
                }}
              >
                <DeleteIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Descargar">
              <IconButton 
                size="small" 
                onClick={() => onDownload(remito)}
                sx={{ 
                  backgroundColor: "#f3e5f5",
                  "&:hover": { backgroundColor: "#e1bee7" },
                  width: 32,
                  height: 32,
                }}
              >
                <CloudDownloadIcon sx={{ fontSize: "0.9rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RemitoCard; 