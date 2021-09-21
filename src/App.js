import { Provider } from "react-redux";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { store, persistor } from "./store";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Dashboard from "./components/Container/Admin/Dashboard";
import Login from "./components/Container/Accounts/Login";
import Register from "./components/Container/Accounts/Register";
import SaleEmployee from "./components/Container/pages/Sales";
import Alert from "./components/layouts/alert";
import { PersistGate } from "redux-persist/integration/react";
import Pagenotfound from "./components/Container/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery.js";
import { ToastContainer } from "react-toastify";
import EditUser from "./components/Container/Admin/EditUser";
import { Fragment } from "react";
import Employee from "./components/Container/pages/Employee";
import SingleSale from "./components/Container/pages/SingleSale";
import AllSales from "./components/Container/pages/AllSales";
import Trials from "./components/Container/pages/Trials";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Fragment>
            <Header />
            <Alert />
            <Switch>
              <Route exact path="/admin" component={Dashboard} />
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/sale" component={SaleEmployee} />
              <Route exact path="/editUser" component={EditUser} />
              <Route exact path="/employee/:id" component={Employee} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/sell" component={SingleSale} />
              <Route exact path="/print" component={EditUser} />
              <Route exact path="/employeeSales" component={AllSales} />
              <Route exact path="/test" component={Trials} />
              <Route component={Pagenotfound} />
            </Switch>
            <ToastContainer />
            <Footer />
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
