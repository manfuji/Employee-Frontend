import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Employee(props) {
  const [data, setData] = useState({ post: [] });
  const [sale, setSale] = useState("");
  useEffect(() => {
    const owner = props.match.params.id;
    setSale(owner);
    console.log(sale);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`${process.env.REACT_APP_MY_BASEURL}/api/sales`, { owner }, config)
      .then((res) => {
        setData({ post: res.data });
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  console.log(data.post);
  // const cat = data.post;
  return (
    <>
      <div className="container m-5">
        <table className="table responsive">
          <thead>
            <tr>
              <th scope="col">Food</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.post.map((post) => (
              <tr>
                <th scope="row" key={post.indexOf}>
                  {post.product}
                </th>
                <td>gh {post.price}</td>
                <td>{post.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4>
        <Link className="float-right pr-4" to="/admin">
          Back to Dashboard
        </Link>
      </h4>
    </>
  );
}

export default Employee;
