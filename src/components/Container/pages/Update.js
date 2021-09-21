// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { Link, Redirect } from "react-router-dom";
// import { toast } from "react-toastify";

// function Dashboard(props) {
//   const { isAuthenticated, user, token } = props.Auth;

//   const [sale, setSale] = useState({ post: [] });
//   const [data, setData] = useState({ post: [] });
//   const [SaleData, setSaleData] = useState({ post: [] });
//   const owner = user?.username;

//   useEffect(() => {
//     // Headers
//     // const config = {
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     // };

//     // // If token, add to headers config
//     // if (token) {
//     //   config.headers["Authorization"] = `Token ${token}`;
//     // }

//     axios.get("http://localhost:8000/api/sale").then((res) => {
//       setData({
//         ...data,
//         post: res.data,
//       });
//       console.log(data);
//     });
//     // if (owner) {
//     //   const config = {
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //   };
//     //   axios
//     //     .post(
//     //       `${process.env.REACT_APP_MY_BASEURL}/api/sales`,
//     //       { owner },
//     //       config
//     //     )
//     //     .then((res) => {
//     //       setSale({ post: res.data });
//     //     })
//     //     .catch((err) => console.log(err));
//     // } else {
//     //   console.log("sorry");
//     // }
//   }, []);

//   const initialState = {
//     username: "",
//     password1: "",
//     password2: "",
//     email: "",
//   };
//   const [regform, setregForm] = useState(initialState);
//   const handleChange = (e) => {
//     setregForm({
//       ...regform,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const HandleSubmit = (e) => {
//     e.preventDefault();
//     if (regform.password1 !== regform.password2) {
//       toast.error("Please your Passwords do not match");
//     } else {
//       const newUser = {
//         usr: regform.username,
//         email: regform.email,
//         password: regform.password1,
//       };
//       props.Registers(newUser);
//     }
//   };

//   if (!isAuthenticated) {
//     return <Redirect to="/" />;
//   }
//   return (
//     <>
//       <h3 className="text-center text-capitalize trend">Administrator</h3>
//       <hr />

//       <div className="mt-5 container">
//         <button
//           type="button"
//           className="btn btn-primary"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//         >
//           Add User
//         </button>
//         <button type="button" className="btn btn-outline-success m-3">
//           <Link to="/editUser">Edit User</Link>
//         </button>

//         {/* <!-- Modal --> */}

//         <div
//           className="modal fade"
//           id="exampleModal"
//           tabIndex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalLabel">
//                   New User
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div>
//                   {/* <form onSubmit={HandleSubmit}> */}
//                   <div className="form-row">
//                     <div className="htmlForm-group col-md-12">
//                       <label htmlFor="inputEmail4">Email</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         id="inputEmail4"
//                         name="email"
//                         // value={regform.email}
//                         // onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <label htmlFor="inputuser9">Username</label>
//                       <input
//                         type="type"
//                         className="form-control"
//                         id="inputuser9"
//                         name="username"
//                         // value={regform.username}
//                         // onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>
//                   <div className="form-group form-row">
//                     <div className="form-group col-md-12">
//                       <label htmlFor="inputPassword7">Password</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="inputPassword7"
//                         name="password1"
//                         // value={regform.password1}
//                         // onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <label htmlFor="inputPassword4">Confirm Password</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         id="inputPassword4"
//                         name="password2"
//                         // value={regform.password2}
//                         // onChange={handleChange}
//                         required
//                       />
//                     </div>
//                     <div className="form-group col-md-12">
//                       <label htmlFor="inputPassword4">Position</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="inputPassword4"
//                         name="position"
//                         // value={regform.password2}
//                         // onChange={handleChange}
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* </form> */}
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-danger"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button type="button" className="btn btn-success">
//                   Save changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <table className="table responsive">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Position</th>
//               <th scope="col">Total Sales</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th scope="row">1</th>
//               <td>Mariam</td>
//               <td>Sale Offcer</td>
//               <td>Ghc 1200</td>
//             </tr>
//             <tr>
//               <th scope="row">2</th>
//               <td>Hope</td>
//               <td>Chief Chef</td>
//               <td>Ghc 432210</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }
// const mapPropsToState = (state) => ({
//   Auth: state.Auth,
// });
// export default connect(mapPropsToState, {})(Dashboard);
