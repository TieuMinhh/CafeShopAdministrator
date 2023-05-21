import React from "react";
import { Redirect, withRouter } from "react-router";
import logo from "../../assets/images/dog.png";
import { connect } from "react-redux";
import global from "../../global/global";
import Login from "../Login/Login";
import { Link } from "react-router-dom";
// import DangNhap from "./DangNhap";
import { FaArrowRight, FaSmile } from "react-icons/fa";
import "./Home.scss";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowHidePassword: false,
      errMessage: "",
      user: "",
      dangnhap: false,
    };
    // global.isLoggedIn = (user) => this.onSignIn(user)
  }

  componentDidMount() {
    // let data = localStorage.getItem('dangnhap')
    // this.setState({
    //     dangnhap: data
    // })
    console.log("Hello");
    console.log("isDangNhap", this.props.reduxState.isDangNhap);
    if (this.props.reduxState.isDangNhap) {
      console.log("ComponentDidmout Home");
    } else {
      this.props.history.push("dangnhap");
      console.log("History:", this.props.history);
    }
  }

  onSignIn = (user) => {
    this.setState({
      user: user,
    });
  };
  handleDelete = (user) => {
    console.log(">>> Check user: ", user);
    this.props.deleteRedux(user);
  };

  handleCreate = () => {
    this.props.createRedux();
  };
  logout = () => {
    // localStorage.removeItem('user')
    // this.setState({
    //     user: null
    // })

    this.setState({
      dangnhap: false,
    });
    this.props.logoutRedux();
    this.props.history.push("dangnhap");
  };

  render() {
    // const login = <Login />;
    console.log(">>Check props: ", this.props);
    let listUser = this.props.phongTP;
    console.log("List user: ", listUser);
    const { user } = this.state;

    return (
      <div className="home-background">
        <section className="background-image section">
          <h1 className="background-title">
            Chào mừng ngài đã đăng nhập
            {/* 欢 迎 来 到 咖 啡 厅 Chào mừng ngài đã đăng nhập */}
          </h1>
          <h1 className="background-title">Cafe Shop</h1>
          {/* <h1 className="background-title">管 理 页 面Cafe Shop</h1> */}

          <button className="background-button">
            <Link to="/category">
              Bắt đầu
              {/* 开 始Bắt đầu */}
              <i className="arrow-right">
                <FaArrowRight />
              </i>
            </Link>
          </button>
        </section>
        {/* 开 始 吧 */}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
