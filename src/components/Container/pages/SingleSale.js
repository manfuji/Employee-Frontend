import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { createMessage } from "../../../Actions/messages";

function SingleSale(props) {
  const componentRef = useRef();
  const { isAuthenticated, user } = props.Auth;
  const initialState = {
    product: "",
    quantity: "",
    price: "",
  };
  const print = () => {
    window.print();
  };

  const [data, setData] = useState(initialState);
  const [SaleData, setSaleData] = useState({ post: [] });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [sale, setSale] = useState({ post: [] });
  const onSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { product, quantity, price } = data;
    const owner = user.username;
    console.log(data);
    const body = JSON.stringify({ owner, price, product, quantity });
    console.log(body);
    axios
      .post(`${process.env.REACT_APP_MY_BASEURL}/api/sale/`, body, config)
      .then((res) => {
        setSaleData({ post: res.data });

        toast.success("Item sold successfully");
      });
  };
  console.log(sale);
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
  const date = new Date();
  const hour = date.getHours();

  // export const Example = () => {

  return (
    <>
      <div className="mt-5 container">
        <div className="text-capitalize d-flex gap-3 mb-3">
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Sell food
          </button>
        </div>
        {/* printing sales */}

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog position-fixed modal-top-full"
            style={{
              left: "0",
              margin: "0",
              width: "100%",
              maxWidth: "inherit",
            }}
          >
            <div className="modal-content ">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Bravos Food
                </h5>
                <Link to="/sale">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </Link>
              </div>

              <form onSubmit={onSubmit}>
                <div className="modal-body row">
                  <div className="form-group col">
                    <label htmlFor="sel1">Food:</label>
                    <select
                      className="form-control"
                      id="sel1"
                      name="product"
                      value={data.product}
                      onChange={onChange}
                    >
                      <option>.....</option>
                      <option>Banku</option>
                      <option>Fufu</option>
                      <option>Jollof</option>
                      <option>Burger</option>
                      <option>drink</option>
                      <option>pie</option>
                      <option>water</option>
                    </select>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="sel1">Price:</label>
                    <select
                      className="form-control"
                      id="sel1"
                      name="price"
                      value={data.price}
                      onChange={onChange}
                    >
                      <option>.....</option>
                      <option>20</option>
                      <option>32</option>
                      <option>10</option>
                      <option>25</option>
                      <option>35</option>
                      <option>54</option>
                      <option>12</option>
                    </select>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="sel1">Quantity:</label>
                    <select
                      className="form-control"
                      id="sel1"
                      name="quantity"
                      value={data.quantity}
                      onChange={onChange}
                    >
                      <option>.....</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    name="owner"
                    value={data.owner}
                    onChange={onChange}
                    hidden
                  />
                  <div className="row mt-2 container">
                    <button
                      type="submit"
                      className="btn btn-success col"
                      onClick={print}
                    >
                      submit
                    </button>

                    {/* <label
                        htmlFor="sel1"
                        className="text-lg fs-3 fw-bold text-primary col"
                      >
                        Total: Ghc{" "}
                      </label> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!--modal end--> */}

        <table className="table responsive">
          <thead>
            <tr>
              <th scope="col">Food</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {SaleData.post.length < 0 ? (
              ""
            ) : (
              <tr>
                <th scope="row">{SaleData.post.product}</th>
                <td>gh {SaleData.post.price}</td>
                <td>{SaleData.post.quantity}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, createMessage)(SingleSale);
