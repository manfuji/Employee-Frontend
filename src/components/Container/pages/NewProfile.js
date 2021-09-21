
import React, { Fragment, useState,useEffect } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const NewProfile = (props) => {
  NewProfile.prototype = {
    Auth: PropTypes.object.isRequired,
  };
 
  const history = useHistory();
  const initialState = Object.freeze({
    about: "",
    university: "",
    interest: "",
    
  });
  const { user,token,profiles } = props.Auth;
  const name = user.username;
  const [formdata, updateformdata] = useState(initialState);
  const [postimage, UpdatePostImage] = useState(null);
 const profi = profiles.data;
  const onChange = (e) => {
    if (e.target.files) {
      UpdatePostImage({
        image: e.target.files[0],
      });
      console.log(e.target.files);
    }
    if (formdata.about ==="") {
      updateformdata({
        about:profi.bio
      })
    }
     if (formdata.interest === "") {
       updateformdata({
         interest: profi.interest,
       });
     }
      if (formdata.university === "") {
        updateformdata({
          university: profi.university,
        });
      }
       
        else {
         updateformdata({
           ...formdata,
           [e.target.name]: e.target.value,
         });
       }
  };
  console.log(name)
  const onSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_MY_BASEURL}/api/updateprofile/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }


    const postform = new FormData();
    postform.append("image", postimage.image, postimage.image.name);
    postform.append("bio", formdata.about);
    postform.append("interest", formdata.interest);
    postform.append("university", formdata.university);

    axios
      .put(url, postform, config)
      .then((res) => {
        toast.info("created succefully");
        history.push({
          pathname: "/profile/",
        });
      })
      .catch((err) => toast.error("Post not created"));

  }; 
 
  return (
    <Fragment>
      <div className="container col-md-6">
        <div className="container text-primary">
          <h1 className=" display-4 text-center heading"> Edit Profile</h1>{" "}
          <hr />
        </div>
        <form className="px-4 py-3" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleDropdownFormPost">About</label>
            <textarea
              type="text"
              className="form-control"
              id="exampleDropdownFormPost"
              placeholder="about"
              name="about"
              value={formdata.about}
              onChange={onChange}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleDropdownFormPost">Your Interest</label>
            <textarea
              type="text"
              className="form-control"
              id="exampleDropdownFormPost"
              placeholder="interest"
              name="interest"
              value={formdata.interest}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleDropdownFormPost">university</label>
            <input
              type="text"
              className="form-control"
              id="exampleDropdownFormPost"
              placeholder="university"
              name="university"
              value={formdata.university}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleDropdownFormPost">Picture</label>
            <input
              type="file"
              className="form-control"
              id="exampleDropdownFormPost"
              name="image"
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-rounded"
          >
           profile
          </button>
        </form>
      </div>
    </Fragment>
  );
};



const mapStateToProps =(state)=>({
  Auth:state.Auth,
});

export default connect(mapStateToProps, null)(NewProfile);
