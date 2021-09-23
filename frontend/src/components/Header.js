import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout, getUserDetails } from "../actions/loginAction.js";
const Header = () => {
  const dispatch = useDispatch();
  //const userLogin = useSelector((state) => state.userLogin);
  let userLogin = useSelector((state) => state.userLogin);
  let loginInfo = null;
  while (userLogin.state) {
    userLogin = userLogin.state;
  }

  let user = JSON.parse(localStorage.getItem("userInfo"));
  if (user === null) {
    user = JSON.parse(localStorage.getItem("loginInfo"));
  }

  loginInfo = userLogin.loginInfo;
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            WideHavon
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Nav className="mr-auto">
            <Nav.Link href="/cart">
              <i className="fas fa-shopping-cart px-2"></i>
              Cart
            </Nav.Link>
            {user ? (
              <NavDropdown title={user.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {loginInfo && loginInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </div>
      </nav>
    </header>
  );
};

export default Header;
