import React, { Component } from "react";
import { connect } from "react-redux";
import { Registers } from "../../../Actions/Auth";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { createMessage } from "../../../Actions/messages";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };
  static propTypes = {
    Registers: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });
  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      toast.error("Password do not match");
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      this.props.Registers(newUser);
      alert("Added User");
    }
    this.setState({ email: "", password: "", password2: "", username: "" });
  };

  render() {
    if (this.props.isAuthenticated && !this.props.Auth.user.is_staff) {
      return <Redirect to="/admin" />;
    } else if (this.props.isAuthenticated && !this.props.Auth.user.is_staff) {
      return <Redirect to="/sale" />;
    }

    const { username, email, password, password2 } = this.state;
    return (
      <div className=" container col-md-6 items-center">
        <div className="container text-primary">
          <h1 className=" display-4 text-center heading"> Register</h1> <hr />
        </div>
        <form onSubmit={this.onSubmit} className="ml-5">
          <div className="form-row">
            <div className="htmlForm-group ">
              <label htmlFor="inputEmail4">Email</label>
              <br />

              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={email}
                onChange={this.onChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputuser9">Username</label>
              <input
                type="type"
                className="form-control"
                id="inputuser9"
                name="username"
                value={username}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="form-group form-row">
            <div className="form-group ">
              <label htmlFor="inputPassword7">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword7"
                name="password"
                value={password}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group ">
              <label htmlFor="inputPassword4">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                name="password2"
                value={password2}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <button type="submit" className="btn btn-primary col mt-4">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  Auth: state.Auth,
});
export default connect(mapStateToProps, { Registers, createMessage })(Register);
