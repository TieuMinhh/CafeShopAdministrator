import logo from "./logo.svg";
import "./App.scss";
import MyComponent from "./Example/MyComponent";
import ListToDo from "./Todos/ListToDo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./Nav/Nav";
import Home from "./Example/Home";
import DetailUser from "./Users/DetailUser";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ListUser from "./Users/ListUser";
import TestApi from "./Users/TestApi";
import Login from "./Login/Login";
import DangNhap from "./Example/DangNhap";
import Category from "./Category/Category";
import Product from "./Product/Product";
import DetailProduct from "./DetailProduct/DetailProduct";
import Order from "./Order/Order";
import OrderDetail from "./OrderDetail/OrderDetail";
import Account from "./Account/Account";
import React, { Component } from "react";
import { connect } from "react-redux";
import DoanhSo from "./DoanhSo/DoanhSo";
// import Footer from "./Footer/Footer";

class App extends Component {
  render() {
    console.log("app isDangNhap: ", this.props);
    return (
      <BrowserRouter>
        <div className="App">
          {/* <header className="App-header"> */}
          {this.props.reduxState.isDangNhap && <Nav />}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/list-todo">
              <ListToDo />
            </Route>
            <Route path="/my-component">
              <MyComponent />
            </Route>
            <Route path="/user" exact>
              <ListUser />
            </Route>
            <Route path="/user/:id">
              <DetailUser />
            </Route>
            <Route path="/test">
              <TestApi />
            </Route>
            <Route path="/login">
              <Login />
              {/* <DangNhap/> */}
            </Route>
            <Route path="/dangnhap" exact>
              <DangNhap />
            </Route>
            <Route path="/category">
              <Category />
            </Route>
            <Route path="/product">
              <Product />
            </Route>
            <Route path="/orders">
              <Order />
            </Route>
            <Route path="/chiTiet">
              <DetailProduct />
            </Route>
            <Route path="/orderdetail">
              <OrderDetail />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/doanhso">
              <DoanhSo />
            </Route>
          </Switch>

          {/* </header > */}
          {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          /> */}
          {/* {this.props.reduxState.isDangNhap && <Footer />} */}

          {/* Same as */}
          <ToastContainer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRedux: (userDelete) =>
      dispatch({ type: "DELETE_USER", payload: userDelete }),
    // createRedux: () => dispatch({ type: 'ADD_USER' })
    logoutRedux: () => dispatch({ type: "dangXuat" }),
  };
};

const mapStateToProps = (state) => {
  return {
    reduxState: state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
