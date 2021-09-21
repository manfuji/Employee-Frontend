import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
// import { toast } from "react-toastify";
import { createMessage } from "../../../Actions/messages";
import ComponentToPrint from "../pages/ComponentToPrint";

function Dashboard(props) {
  const { isAuthenticated, user } = props.Auth;
  let history = useHistory();
  const [data, setData] = useState({ search: "" });
  // const [SaleData, setSaleData] = useState({ post: [] });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onChange = (e) => {
    setData({
      ...data,
      search: e.target.value,
    });
    console.log(data);
  };

  const [sale, setSale] = useState({ post: [] });
  const onSubmit = (e) => {
    e.preventDefault();
    if (data.search !== "") {
      history.push({
        pathname: "/employee/" + data.search,
      });
      // window.location.reload();
    }
    <Redirect to={`employee/${data.search}`} />;
    console.log(data.search);
  };

  console.log(sale);
  // const owner = user?.username;
  useEffect(() => {
    // if (owner) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_MY_BASEURL}/api/sale`,

        config
      )
      .then((res) => {
        setSale({ post: res.data });
      })
      .catch((err) => console.log(err));
    // } else {
    //   console.log("sorry");
    // }
  }, []);

  console.log();
  if (!isAuthenticated && !props.Auth.is_staff) {
    return <Redirect to="/" />;
  }
  if (isAuthenticated && !props.Auth.user.is_staff) {
    return <Redirect to="/sale" />;
  }
  const date = new Date();
  const hour = date.getHours();

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
          <div>
            <form className="" onSubmit={onSubmit}>
              <label for="exampleDataList" className="form-label">
                Search for Employee
              </label>
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Type to search..."
                name="owner"
                value={data.search}
                onChange={onChange}
              />
              <datalist id="datalistOptions">
                {sale.post.map((post) => (
                  <div key={post.quantity}>
                    <option value={post.owner} />
                  </div>
                ))}
              </datalist>
              <button type="submit" class="btn btn-primary mt-3">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <ComponentToPrint ref={componentRef} />
        <button className="btn btn-success" onClick={handlePrint}>
          Print out sales
        </button>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});
export default connect(mapStateToProps, createMessage)(Dashboard);
