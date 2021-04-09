import React from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import auth from '../api/auth-helper'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  SignOut()
  {
    auth.clearJWT();
    window.location.href = "/";
  }
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        
          <NavbarBrand className="ml-2" tag={Link} to="/">
            <i class="fa fa-pie-chart" aria-hidden="true"></i> Quick Poll
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} className="border-0" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar >
              <NavItem className="mx-md-3">
                <NavLink tag={Link} to="/">
                    <i class="fa fa-home"></i> Home
                </NavLink>
              </NavItem>
              {!auth.isAuthenticated() && <NavItem className="mx-md-3">
                <NavLink tag={Link} to="/login">
                    <i class="fa fa-sign-in" aria-hidden="true"></i> LogIn
                </NavLink>
              </NavItem>}
              {!auth.isAuthenticated() && <NavItem className="mx-md-3">
                <NavLink tag={Link} to="/register">
                    <i class="fa fa-sign-in" aria-hidden="true"></i> Register
                </NavLink>
              </NavItem>}

              {auth.isAuthenticated() && <NavItem className="mx-md-3">
                <Button outline color="warning" tag={Link} to="/createpoll">
                    <i class="fa fa-plus" aria-hidden="true"></i> Create Poll
                </Button>
              </NavItem>}

              {auth.isAuthenticated() && <NavItem className="mx-md-3">
                <Button className="btn btn-outline-info" onClick={this.SignOut} >
                  <i class="fa fa-sign-out" aria-hidden="true"></i> SignOut
                </Button>
              </NavItem>}

            </Nav>
          </Collapse>
       
      </Navbar>
    );
  }
}