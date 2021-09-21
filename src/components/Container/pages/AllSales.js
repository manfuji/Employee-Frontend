import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { createMessage } from "../../../Actions/messages";

function Allsales(props) {
  // const componentRef = useRef();
  const { isAuthenticated, user } = props.Auth;
  const [sale, setSale] = useState({ post: [] });

  const owner = user?.username;

  useEffect(() => {
    if (owner) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_MY_BASEURL}/api/sales`,
          { owner },
          config
        )
        .then((res) => {
          setSale({ post: res.data });
        })
        .catch((err) => console.log(err));
    } else {
      console.log("sorry");
    }
  }, [owner]);

  console.log();
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  // calculating for gross total
  let total = 0;
  for (let i = 0; i < sale.post.length; i++) {
    total += parseInt(sale.post[i].total_price);
  }

  return (
    <div className="container col-md-12 items-center">
      <p>
        <h1 className="fw-bold">Total Sales:Ghc {total}.00 </h1>
      </p>
      <table className="table responsive">
        <thead>
          <tr>
            <th scope="col">Food</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total Price</th>
            <th scope="col">Date </th>
          </tr>
        </thead>
        <tbody>
          {sale.post
            .slice(0)
            .reverse()
            .map((post) => (
              <tr>
                <th scope="row" key={post.indexOf}>
                  {post.product}
                </th>
                <td>Ghc {post.price}.00</td>
                <td>{post.quantity}</td>
                <td>Ghc {post.total_price}.00</td>
                <td>{post.Published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, createMessage)(Allsales);
