import React, {  useState } from "react";
import {Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Registers } from "../../../Actions/Auth";
import { createMessage } from "../../../Actions/messages";

function SignUp(props) {

    SignUp.prototype = {
      Auth: PropTypes.object.isRequired,
    };
 const initialState = {
   username: "",
   password1: "",
   password2: "",
   email: "",
 };
 const [regform, setregForm] = useState(initialState);
    const handleChange = (e) => {
         
        
       setregForm({
         ...regform,
         [e.target.name]: e.target.value,
       });
     };
    
      const HandleSubmit = (e) => {
          e.preventDefault();
          if (regform.password1 !== regform.password2) {
              toast.error("Please your Passwords do not match");
          }
          else {
              
              const newUser = {
                usr: regform.username,
                email: regform.email,
                password: regform.password1,
              };
              props.Registers(newUser);
          }
      };
    return (
      <div>
        <form onSubmit={HandleSubmit}>
          <div className="form-row">
            <div className="htmlForm-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={regform.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputuser9">Username</label>
              <input
                type="type"
                className="form-control"
                id="inputuser9"
                name="username"
                value={regform.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword7">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword7"
                name="password1"
                value={regform.password1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                name="password2"
                value={regform.password2}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                keep me login
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
          <Link to="/login">Already Have Account?</Link>
        </form>
      </div>
    );
}
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, { createMessage, Registers })(
 SignUp
);
