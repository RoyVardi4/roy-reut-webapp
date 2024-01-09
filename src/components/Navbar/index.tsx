import { useNavigate } from 'react-router-dom'
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import LogoutAPI from "../../api/Logout";

export function NavBar() {
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await LogoutAPI.userLogout();
            navigate('/login', { replace: true })
        } catch (err) {
            alert(err)
        }

    }

    return (
        <nav className="navbar-container">
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/myrecipes">My Recipes</NavLink>
            <Button onClick={() => logout()} >logout</Button>
        </nav>
    );
}
