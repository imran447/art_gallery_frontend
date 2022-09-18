import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import WebAssetOffSharpIcon from '@mui/icons-material/WebAssetOffSharp';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HistoryIcon from "@mui/icons-material/History";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LogoutIcon from "@mui/icons-material/Logout";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const _location = window.location?.pathname;
  const [sideBarList, setSideBarList] = useState([
    {
      Icon: <WebAssetIcon />,
      title: "Users",
      navigate: "/dashboard",
      active: false,
    },
    {
      Icon: <HistoryIcon />,
      title: "Artist",
      navigate: "/dashboard/artist",
      active: false,
    },
    {
      Icon: <TrackChangesIcon />,
      title: "Arts",
      navigate: "/dashboard/artslist",
      active: false,
    },
    {
      Icon: <TrackChangesIcon />,
      title: "Fun facts",
      navigate: "/dashboard/funfacts",
      active: false,
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    let _route = _location
      .replace(/\/+$/, "")
      .split("/")
      .pop()
      .toLocaleLowerCase();
    _route =
      _route === "dashboard" ? `${"/" + _route}` : `/dashboard/${_route}`;
    handleSelectedNavItem(_route);
  }, [_location]);

  const handleSelectedNavItem = (route) => {
    let _navbar = [...sideBarList];
    let item = _navbar.find((item) => item.active === true);
    if (item) {
      item.active = false;
    }
    item = _navbar.find((item) => item.navigate === route);
    if (item) {
      item.active = true;
    }
    setSideBarList(_navbar);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (component) => {
    navigate(component);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} style={{backgroundColor:'#194B43'}}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                sx={{
                  flexGrow: 1,
                  ...(open && { display: "none" }),
                }}
              >
                Art Gallery
              </Typography>
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              backgroundColor: "#194B43",
              px: [1],
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="white"
              noWrap
              sx={{
                flexGrow: 1,
                ...(open && { display: "block" }),
              }}
            >
              Art Gallery
            </Typography>
            <IconButton onClick={toggleDrawer} className="leftIconButton">
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {sideBarList.map((sideBarItem) => {
              return (
                <ListItemButton
                  className={sideBarItem.active ? "active-link" : ""}
                  onClick={() => {
                    handleNavigation(sideBarItem.navigate);
                  }}
                >
                  <ListItemIcon>{sideBarItem.Icon}</ListItemIcon>
                  <ListItemText primary={sideBarItem.title} />
                </ListItemButton>
              );
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* {renderSubPages()} */}
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Layout(props) {
  return <DashboardContent {...props} />;
}
