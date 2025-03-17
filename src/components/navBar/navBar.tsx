import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AccountCircle, Home, Logout } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {

    const sxNavBar = {
        position: 'fixed',
        bottom: 1,
        left: 1,
        right: 0,
        backgroundColor: "#430c8c",
        borderTop: 3,
        borderColor: "#a737fc"
    };

    const sxIcons = { color: "white" };

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
                icon={<Logout style={sxIcons} />}
            />
        </BottomNavigation>
    );
};
