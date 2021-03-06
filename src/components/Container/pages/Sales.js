import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { createMessage } from "../../../Actions/messages";

function SaleEmployee(props) {
  // const componentRef = useRef();
  const { isAuthenticated, user } = props.Auth;
  const initialState = {
    product: "",
    quantity: "",
    price: "",
    total_price: 0,
  };

  const [data, setData] = useState(initialState);
  const [today, setDate] = useState(new Date());
  const [btn, setBtn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [SaleData, setSaleData] = useState({ post: [] });
  const [print, setPrint] = useState([]);

  // taking care of time changing
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  data.total_price = parseInt(data.quantity) * parseFloat(data.price);

  const [sale, setSale] = useState({ post: [] });
  const onSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { product, quantity, price, total_price } = data;
    const owner = user.username;
    console.log(data);
    const body = JSON.stringify({
      owner,
      price,
      product,
      quantity,
      total_price,
    });
    console.log(body);
    axios
      .post(`${process.env.REACT_APP_MY_BASEURL}/api/sale/`, body, config)
      .then((res) => {
        setSaleData({ post: res.data });

        alert("Item sold successfully");
        setSubmitted(true);
      })
      .catch((err) => alert("Problem Selling Check your Network"));
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

  // refresh
  const Refresh = () => {
    window.location.reload();
  };

  //taking care of printing
  const HandlePrint = () => {
    // let arr = print.concat(data);
    // setPrint(arr);
    setBtn(true);
    setTimeout(function () {
      window.print();
    }, 3000);
  };
  const passData = () => {
    let arr = print.concat(data);
    setPrint(arr);
  };
  // calculating for gross total
  let total = 0;
  for (let i = 0; i < print.length; i++) {
    total += print[i].total_price;
  }

  // initializing time
  const saleTime = today.toLocaleTimeString("en", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  const saleDate = today.toLocaleDateString("en", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  return (
    <>
      <div className="text-center">
        {hour < 12 ? (
          <h6>Good Morning</h6>
        ) : hour > 11 && hour < 17 ? (
          <h6>Good afternoon </h6>
        ) : (
          <h6>Good evening</h6>
        )}
      </div>
      <h3 className="text-center text-capitalize ">{user.username}</h3>

      <hr />

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
          <Link
            to="/employeeSales"
            type="Link"
            className="btn btn-outline-primary"
          >
            Check all Sales
          </Link>
        </div>

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
              height: "100%",
            }}
          >
            <div className="modal-content ">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={Refresh}
                ></button>
              </div>
              {print.length > 0 ? (
                <div className="container col-md-4">
                  <h1 className="fw-bold text-center">Bravos Food</h1>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {print.map((post, index) => (
                        <tr>
                          {}
                          <th scope="row" key={post.indexOf}>
                            {post.product}
                          </th>
                          <td>{post.quantity}</td>
                          <td>gh {post.price}</td>
                          <td>gh {post.total_price}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colspan="3">Total: </td>
                        <td>Ghc {total}.00</td>
                      </tr>
                      <tr className="fw-bold text-capitalize">
                        <td colspan="2">Sold By </td>
                        <td>{user.username}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                ""
              )}
              {!btn ? (
                <form onSubmit={onSubmit} className="container col-md-6">
                  <div className="modal-body">
                    <div className="form-group row">
                      <label htmlFor="sel1">Food:</label>
                      <select
                        className="form-control"
                        id="sel1"
                        name="product"
                        value={data.product}
                        onChange={onChange}
                      >
                        <option>.....</option>
                        <option>Banku and Okro Soup</option>
                        <option>Fufu and Goat Meat Soup</option>
                        <option>Jollof Rice</option>
                        <option>Burger</option>
                        <option>drink</option>
                        <option>pie</option>
                        <option>General Pizza </option>
                        <option>Family Size</option>
                        <option>Large Size</option>
                        <option>Mega Size</option>
                        <option>Shawarma </option>
                        <option>Hamburger </option>
                        <option>Pie </option>
                        <option>Potato Chips</option>
                        <option>African Salad</option>
                        <option>Hambuger And Chip</option>
                        <option>Fufu With Tilapia</option>
                        <option>Club Sandwich and Club</option>
                        <option>Meat Salad</option>
                        <option>Vegetarian Pizza</option>
                        <option>Malt</option>
                        <option> Fanta</option>
                        <option>Guiness</option>
                        <option></option>
                        <option>Meat Salad</option>
                        <option>Meat Salad</option>
                      </select>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="sel1">Price:</label>
                      <select
                        className="form-control"
                        id="sel1"
                        name="price"
                        value={data.price}
                        onChange={onChange}
                      >
                        <option>.....</option>
                        <option>5.00</option>
                        <option>12.00</option>
                        <option>13.00</option>
                        <option>15.00</option>
                        <option>16.00</option>
                        <option>18.00</option>
                        <option>20.00</option>
                        <option>25.00</option>
                        <option>30.00</option>
                        <option>35.00</option>
                        <option>40.00</option>
                        <option>45.00</option>
                        <option>50.00</option>
                        <option>60.00</option>
                        <option>70.00</option>
                      </select>
                    </div>
                    <div className="form-group row ">
                      <label htmlFor="sel1" className="">
                        Quantity:
                      </label>
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
                      {data.total_price > 0 ? (
                        <label
                          htmlFor="sel1"
                          className="text-lg fs-3 fw-bold text-primary col"
                        >
                          Total: Ghc {data.total_price}
                        </label>
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        className="btn btn-success col"
                        onClick={passData}
                      >
                        Submit
                      </button>
                    </div>
                    {submitted ? (
                      <div className="row">
                        <button
                          type="button"
                          className="btn btn-danger col mt-2"
                          onClick={HandlePrint}
                        >
                          Print
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </form>
              ) : (
                <>
                  <div class="col-md-12 text-center fw-bold mt-5">
                    <p className="">Thank You For the Purchase !!</p>
                    <span>
                      Receipt Issued on: {saleDate} {saleTime}
                    </span>
                    <span className="text-capitalize">
                      <br />
                      <span>Tel: </span>
                      <span colspan="3">0247130081 or 0500856550</span>
                      <br />
                    </span>
                    <span className="">
                      <span>visit: </span>
                      <span colspan="3">bravosfoodgh.com for more </span>
                    </span>
                  </div>

                  <br />
                  <br />
                </>
              )}
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
              <th scope="col">Total Price</th>
              <th scope="col">Date </th>
            </tr>
          </thead>
          <tbody>
            {SaleData.post.length < 1 ? (
              ""
            ) : (
              <tr>
                <th scope="row">{SaleData.post.product}</th>
                <td>gh {SaleData.post.price}</td>
                <td>{SaleData.post.quantity}</td>
                <td>{SaleData.post.total_price}</td>
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
export default connect(mapStateToProps, createMessage)(SaleEmployee);
