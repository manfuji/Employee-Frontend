import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../Actions/Auth";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import logo from "./logo.jpg";
import { Profiles } from "../../Actions/Auth";

const Header = (props) => {
  Header.prototype = {
    Auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  // const [profileData, setprofileData] = useState({ profiles: [] });
  const { isAuthenticated, user, profiles } = props.Auth;

  // console.log(profileData, profile)
  console.log(profiles);

  const AuthLinks = (
    <ul className="navbar-nav ml-auto">
      {isAuthenticated && props.Auth.user.is_staff ? (
        <>
          <li className="nav-item">
            <span className="nav-link">
              <Link className="text-primary" to="/admin">
                Dashboard
              </Link>
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link">
              <Link className="text-primary" to="/register">
                Add Employee
              </Link>
            </span>
          </li>
        </>
      ) : (
        ""
      )}
      <li className="nav-item ml-5" style={{ marginLeft: "3rem" }}>
        <span className="nav-link">
          <Link className="text-primary" to="/sale">
            Make Sale
          </Link>
        </span>
      </li>
      <li className="nav-item ml-5" style={{ marginLeft: "3rem" }}>
        <span className="nav-link">
          <Link className="text-primary" to="/employeeSales">
            Check All Sales
          </Link>
        </span>
      </li>
      <li className="nav-item ml-5" style={{ marginLeft: "3rem" }}>
        <span className="nav-link">
          <Link className="text-danger" to="/" onClick={props.logout}>
            Logout
          </Link>
        </span>
      </li>
    </ul>
  );

  const GuestLnks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <span className="nav-link"></span>
      </li>
    </ul>
  );

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Campus New" className="image" />
            <span className="name">BRAVOSFOOD</span>
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <em className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            {isAuthenticated ? AuthLinks : GuestLnks}
          </div>
        </div>
      </nav>
      <br />
      <br />
      <br />
    </>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
  logout: state.Auth,
});
export default connect(mapStateToProps, { logout, Profiles })(Header);
