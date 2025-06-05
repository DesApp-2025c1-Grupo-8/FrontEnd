import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";

function DestinoCard({ destino, onView, onEdit, onCopy, onDelete }) {
  return (
    <Card
      sx={{
        width: "100%",
        //minWidth: "520px",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Icono/Indicador Principal */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 100,
              gap: 1,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                backgroundColor: "#F4FFF8",
                borderRadius: 2,
                border: "2px solid #028090",
              }}
            >
              <LocationOnIcon
                sx={{ fontSize: "1.8rem", mb: 0.3 }}
                color="primary"
              />
              <Typography
                variant="caption"
                sx={{ fontWeight: "bold", fontSize: "0.65rem" }}
                color="primary"
              >
                {destino.id}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                fontSize: "0.7rem",
                textAlign: "center",
                backgroundColor: "#F4FFF8",
                px: 1,
                py: 0.3,
                borderRadius: 1,
                border: "1px solid #028090",
              }}
              color="primary"
            >
              CP: {destino.codigo_postal}
            </Typography>
          </Box>

          {/* Información Principal */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {/* Línea 1: Dirección completa */}
            <Box sx={{ mb: 1.2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.15rem",
                  mb: 0.4,
                }}
                color="primary"
              >
                {destino.calle} {destino.altura}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PlaceIcon
                  sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.9rem" }}
                >
                  {destino.localidad}, {destino.municipio}
                </Typography>
              </Box>
            </Box>

            {/* Línea 2: Información de Ubicación */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
              {/* Primera fila: País y Provincia */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs:"column",sm: "column", md: "row" },
                  //alignItems: "center",
                  gap: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    minWidth: 200,
                  }}
                >
                  <PublicIcon
                    sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.8rem", fontWeight: "500" }}
                  >
                    {destino.pais}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <HomeIcon
                    sx={{ fontSize: "0.8rem", color: "text.secondary" }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.8rem", fontWeight: "500" }}
                  >
                    {destino.provincia}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              ml: 2,
              flexShrink: 0,
            }}
          >
            <Tooltip title="Ver detalles">
              <IconButton
                size="small"
                onClick={() => onView && onView(destino)}
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
                onClick={() => onEdit && onEdit(destino)}
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
                onClick={() => onCopy && onCopy(destino)}
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
                onClick={() => onDelete && onDelete(destino)}
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
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DestinoCard;
