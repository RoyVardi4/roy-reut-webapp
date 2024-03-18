import { Link, useNavigate, useLocation } from "react-router-dom";
import LogoutAPI from "../../api/Logout";
import { useUser } from "../../context/user";
import { Fastfood, Logout } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const pages = [
  { label: "Home", link: "/" },
  { label: "Users Recipes", link: "/myrecipes" },
  { label: "My Profile", link: "/profile" },
];

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout: contextLogout, user } = useUser();

  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(pages.findIndex((el) => (el.link === location.pathname)));
  }, [location.pathname]);

  const logout = async () => {
    try {
      await LogoutAPI.userLogout();
      contextLogout();
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err);
    }
  };

  const handleSelectTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Fastfood  sx={{ mr: 2 }}/>
        <Typography variant="h5" sx={{ mr: 6 }}>Recipe Webapp</Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Tabs value={tab} onChange={handleSelectTab}>
            {pages.map(({ label, link }, index) => (
              <Tab
                key={`link${index}`}
                component={Link}
                to={link}
                label={label}
                id={`simple-tab-${index}`}
                aria-controls={`simple-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
        {user && (
          <Tooltip title="logout">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={logout}
              color="inherit"
            >
              <Logout />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
}
