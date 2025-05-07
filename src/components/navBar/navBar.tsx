import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AccountCircle, Home, Logout, Opacity } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import {token} from "../../security/token"

export const NavBar = () => {

    const sxNavBar = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#430c8c",
        borderTop: 3,
        borderColor: "#a737fc",
        Opacity: 1,
    };

    const sxIcons = { color: "white" };
    const clearStorage = () => {
        token.clearToken()
        localStorage.clear();
    }

    return (
        <BottomNavigation sx={sxNavBar} >
            <BottomNavigationAction
                component={NavLink}
                to="/home"
                icon={<Home style={sxIcons} />}
            />
            <BottomNavigationAction
                component={NavLink}
                to="/profile/data"
                icon={<AccountCircle style={sxIcons} />}
            />
            <BottomNavigationAction
                component={NavLink}
                to="/login"
                onClick={clearStorage}
                icon={<Logout style={sxIcons} />}
            />
        </BottomNavigation>
    );
};
