import axios from "axios";
import React, { Component } from "react";

export class ComponentToPrint extends Component {
  state = {
    post: [],
  };
  //  total = 0;
  componentWillMount() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_MY_BASEURL}/api/allsales`,

        config
      )
      .then((res) => {
        this.setState({ post: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let total = 0;
    for (let i = 0; i < this.state.post.length; i++) {
      total += parseInt(this.state.post[i].total_price);
    }
    return (
      <div>
        <div>
          <table className="table responsive">
            <thead>
              <tr>
                <th scope="col">Food</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Sold on</th>
                <th scope="col">Sold By</th>
              </tr>
            </thead>
            <tbody>
              {this.state.post.map((post) => (
                <tr>
                  <th scope="row" key={post.indexOf}>
                    {post.product}
                  </th>
                  <td>ghc {post.price}</td>
                  <td>{post.quantity}</td>
                  <td> ghc {post.total_price}.00</td>
                  <td>{post.Published}</td>
                  <td className="fw-bold text-capitalize">{post.owner}</td>
                </tr>
              ))}
              <tr>
                <td className="fw-bold text-primary">Total:GHC {total}.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ComponentToPrint;
