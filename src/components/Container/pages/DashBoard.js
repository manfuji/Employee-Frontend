import React, { Fragment } from "react";
import { Route } from 'react-router-dom';
import Post from "./Post";
import Login from "../Accounts/Login";
import Register from "../Accounts/Register";
import DetailPage from "./detailPage";
import CreatePost from "./CreatePost";
import Update from "./Update";
import Searchbar from "./searchbar";
import Category from "./category";


const DashBoard =()=>  {
    return (
              <Fragment>
                      <Route exact path="/" component={Post} />
                      <Route exact path="/createPost" component={CreatePost} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                      <Route
                        exact
                        path="/detailPage/:id"
                        component={DetailPage}
                      />
                      <Route exa1t path="/update/:id" component={Update} />
                      <Route exact path="/category/:id" component={Category} />
                      <Route exa1t path="/search/" component={Searchbar} />
              </Fragment>

    );
  }
export default DashBoard;

