import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Avatar,
  Badge,
} from "@mui/material";
import {
  People,
  Description,
  PersonAdd,
  AdminPanelSettings,
  LocalHospital,
  Assignment,
  BarChart,
  Notifications,
  Download,
  Menu as MenuIcon,
  Favorite,
  Logout,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

const menuItems = [
  { label: "Evoluções", icon: <Assignment />, path: "/evolucoes" },
  {
    label: "Cadastrar Evolução",
    icon: <Description />,
    path: "/evolucoes/nova",
  },

  { label: "Pacientes", icon: <People />, path: "/pacientes" },
  { label: "Alertas", icon: <Notifications />, path: "/alertas" },

  // { label: "Cadastrar Paciente", icon: <PersonAdd />, path: "/pacientes/novo" },
  // { label: "Técnicos", icon: <LocalHospital />, path: "/tecnicos" },
  // { label: "Cadastrar Técnico", icon: <PersonAdd />, path: "/tecnicos/novo" },
  // { label: "Resumo Paciente", icon: <BarChart />, path: "/resumo" },
  // { label: "Exportar", icon: <Download />, path: "/exportar" },
  // { label: "Perfil ADM", icon: <AdminPanelSettings />, path: "/perfil-adm" },
  // { label: "Perfil Técnico", icon: <LocalHospital />, path: "/perfil-tecnico" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/login");
  }
  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          px: 2.5,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
          <Favorite fontSize="small" />
        </Avatar>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, lineHeight: 1.2 }}
          >
            ACESO
          </Typography>
        </Box>
      </Box>
      <List sx={{ flex: 1, py: 1, overflowY: "auto" }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setOpen(false)}
                selected={active}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "secondary.light",
                    color: "secondary.dark",
                    "& .MuiListItemIcon-root": { color: "secondary.dark" },
                  },
                  "&.Mui-selected:hover": { bgcolor: "secondary.light" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box
        sx={{
          borderTop: "1px solid",
          borderColor: "divider",
          p: 1,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: "error.main",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "error.lighter",
              },
            }}
          >
            <ListItemIcon sx={{ color: "error.main", minWidth: 36 }}>
              <Logout />
            </ListItemIcon>

            <ListItemText
              primary="Sair"
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (t) => t.zIndex.drawer + 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar variant="dense" sx={{ minHeight: 56 }}>
          <IconButton
            edge="start"
            onClick={() => setOpen(true)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1 }} />
          <IconButton component={Link} to="/alertas" size="small">
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar
            sx={{
              ml: 1.5,
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              fontSize: 13,
            }}
          >
            AD
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          overflowY: "auto",
          bgcolor: "background.default",
          pt: { xs: 9, md: 10 },
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 3, md: 4 },
        }}
      >
        <Box sx={{ width: "100%" }}>{children}</Box>
      </Box>
    </Box>
  );
}
