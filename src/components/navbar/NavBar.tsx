import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import "./NavBar.css";

const NavBar = () => {
  return (
    <Box borderRadius={1} width="100%">
      <Navbar>
        <Nav>
          <div className="navContainer">
            <div>
              <Link to="/">To-do</Link>
            </div>
            <div>
              <Link to="/schedule">Schedule</Link>
            </div>
          </div>
        </Nav>
      </Navbar>
    </Box>
  );
};

export default NavBar;
