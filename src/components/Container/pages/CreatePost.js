
import React, { Fragment, useState } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';


const CreatePost = (props) => {
  CreatePost.prototype = {
    Auth: PropTypes.object.isRequired,
  };
  const history = useHistory();
  const initialState = Object.freeze({
    title: "",
    excerpt: "",
    content: "",
    campus: "",
    category: "",
  });
  const { user } = props.Auth;
  const name = user.username;
  const [formdata, updateformdata] = useState(initialState);
  const [postimage, UpdatePostImage] = useState(null);

  const onChange = (e) => {
    if (e.target.files) {
      UpdatePostImage({
        image: e.target.files[0],
      });
      console.log(e.target.files);
    } else {
      updateformdata({
        ...formdata,
        [e.target.name]: e.target.value,
      });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const url = `${process.env.REACT_APP_MY_BASEURL}/api/createpost/`;

    const postform = new FormData();
    postform.append("subAuthor", name);
    postform.append("title", formdata.title);
    postform.append("content", formdata.content);
    postform.append("campus", formdata.campus);
    postform.append("excerpt", formdata.excerpt);
    postform.append("category", formdata.category);
    postform.append("images", postimage.image, postimage.image.name);

    axios
      .post(url, postform, config)
      .then((res) => {
        toast.info("created succefully");
      })
      .catch((err) => toast.error("Post not created"));

    history.push({
      pathname: "/",
    });
  }; 

  return (
    <Fragment>
      <div className="container col-md-6">
        <div className="container text-primary">
          <h1 className=" display-4 text-center heading"> Create Post</h1>{" "}
          <hr />
        </div>
        <form className="px-4 py-3" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleDropdownFormPost">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleDropdownFormPost"
              placeholder="Title"
              name="title"
              value={formdata.title}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleDropdownFormPost">Excerpt</label>
            <textarea
              type="text"
              className="form-control"
              id="exampleDropdownFormPost"
              placeholder="Excerpt"
              name="excerpt"
              value={formdata.excerpt}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleDropdownFormPost">Content</label>
            <textarea
              type="text"
              className="form-control"
              id="exampleDropdownFormPost"
              placeholder="Content"
              name="content"
              value={formdata.content}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="sel1">Select Category:</label>
            <select
              className="form-control"
              id="sel1"
              name="category"
              value={formdata.category}
              onChange={onChange}
            >
              <option>.....</option>
              <option>News</option>
              <option>Politics</option>
              <option>Education</option>
              <option>Blog</option>
              <option>Article</option>
              <option>Entertainment</option>
              <option>Relationship</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Select Campus:</label>
            <select
              className="form-control"
              id="sel1"
              name="campus"
              value={formdata.campus}
              onChange={onChange}
            >
              <option disabled>
                .....Or if not available just choose university
              </option>
              <option>University</option>
              <option>College</option>
              <option>CENTRAL</option>
              <option>Ashesi</option>
              <option>Legon</option>
              <option>KNUST</option>
              <option>UCC</option>
              <option>UHAS</option>
              <option>KTU</option>
              <option>HTU</option>
              <option>UPS</option>
              <option>TTU</option>
              <option>RMU</option>
              <option>GTUC</option>
              <option>UMAT</option>
              <option>ATU</option>
              <option>UEW</option>
              <option>UDS</option>
              <option>UENR</option>
              <option>CCTU</option>
              <option>KsTU</option>
              <option>TATU</option>
              <option>STU</option>
              <option>UESD</option>
              <option>GIJ</option>
              <option>GIMPA</option>
              <option>NAFTI</option>
              <option>VVU</option>
              <option>ANU</option>
              <option>AIT</option>
            </select>
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
            Create Post
          </button>
        </form>
      </div>
    </Fragment>
  );
};



const mapStateToProps =(state)=>({
  Auth:state.Auth,
});

export default connect(mapStateToProps, null)(CreatePost);
