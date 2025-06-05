import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

function ClienteCard({ cliente, onView, onEdit, onCopy, onDelete }) {
  const getTipoColor = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "estatal":
        return "#2196f3"; // Azul
      case "privado":
        return "#4caf50"; // Verde
      case "particular":
        return "#ff9800"; // Naranja
      default:
        return "#757575"; // Gris
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: "520px", // Límite mínimo de ancho
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
                backgroundColor: "#e3f2fd",
                borderRadius: 2,
                border: "2px solid #2696a6",
              }}
            >
              <BusinessIcon sx={{ color: "#2696a6", fontSize: "1.8rem", mb: 0.3 }} />
              <Typography variant="caption" sx={{ color: "#2696a6", fontWeight: "bold", fontSize: "0.65rem" }}>
                {cliente.IUC}
              </Typography>
            </Box>
            <Chip
              label={cliente.tipo}
              size="small"
              sx={{
                backgroundColor: getTipoColor(cliente.tipo),
                color: "white",
                fontSize: "0.75rem",
                fontWeight: "bold",
                height: 26,
                minWidth: 80,
              }}
            />
          </Box>

          {/* Información Principal */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
                         {/* Línea 1: Razón Social */}
             <Box sx={{ mb: 1.2 }}>
               <Typography 
                 variant="h6" 
                 sx={{ 
                   fontWeight: "bold", 
                   fontSize: "1.15rem", 
                   mb: 0.4,
                   overflow: "hidden",
                   textOverflow: "ellipsis",
                   whiteSpace: "nowrap",
                   color: "#2696a6",
                 }}
               >
                 {cliente.razonSocial}
               </Typography>
               <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                 <PersonIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                 <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                   CUIT/RUT: {cliente["CUIT/RUT"]}
                 </Typography>
               </Box>
             </Box>

            {/* Línea 2: Información de Contacto */}
            <Grid container spacing={3} sx={{ mb: 0.5 }}>
              <Grid item xs={12} sm={5}>
                <Typography variant="caption" sx={{ color: "#388e3c", fontWeight: "bold", fontSize: "0.7rem", mb: 0.4, display: "block" }}>
                  UBICACIÓN
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationOnIcon sx={{ fontSize: "0.95rem", color: "#388e3c" }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: "bold", 
                      fontSize: "0.9rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flex: 1
                    }}
                  >
                    {cliente.direccion}
                  </Typography>
                </Box>
              </Grid>
              
                             <Grid item xs={12} sm={7}>
                 <Typography variant="caption" sx={{ color: "#1976d2", fontWeight: "bold", fontSize: "0.7rem", mb: 0.4, display: "block" }}>
                   CONTACTO
                 </Typography>
                 <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                     <PhoneIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                     <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: "500" }}>
                       {cliente.telefono}
                     </Typography>
                   </Box>
                   <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                     <EmailIcon sx={{ fontSize: "0.85rem", color: "text.secondary" }} />
                     <Typography 
                       variant="body2" 
                       sx={{ 
                         fontSize: "0.85rem",
                         fontWeight: "500"
                       }}
                     >
                       {cliente.email}
                     </Typography>
                   </Box>
                 </Box>
               </Grid>
            </Grid>
          </Box>

                                {/* Acciones */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 2, flexShrink: 0 }}>
             <Tooltip title="Ver detalles">
               <IconButton 
                 size="small" 
                 onClick={() => onView && onView(cliente)}
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
                 onClick={() => onEdit && onEdit(cliente)}
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
                 onClick={() => onCopy && onCopy(cliente)}
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
                 onClick={() => onDelete && onDelete(cliente)}
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

export default ClienteCard; 