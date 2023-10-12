import React from 'react';
import Box from '@mui/material/Box/Box';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Employee from '../features/employees/Employee';
import Detail from '../features/details/Detail';

const menuStyle = {
    position: "absolute",
    backgroundColor: "#205493",
    width: "20%",
    height: "100%"
}

const Layout = () => {
    return (
        <div>
            <Box>
                <Router>
                    <div class={menuStyle}>
                        <Link to="/">Employee</Link>
                        <Link to="/detail">Employee Detail</Link>
                    </div>
                    <Switch>
                        <Route path="/">
                            <Employee />
                        </Route>
                        <Route path="/detail">
                            <Detail />
                        </Route>
                    </Switch>
                </Router>
            </Box>
        </div>
    );
};

export default Layout;