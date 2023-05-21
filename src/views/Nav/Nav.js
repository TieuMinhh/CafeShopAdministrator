import React from "react";
import "./Nav.scss";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LogoImage from "../../assets/images/coffee.png";
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
      checkLogin: false,
    };
  }
  logout = () => {
    // localStorage.removeItem('user')
    // this.setState({
    //     user: null
    // })
    this.props.logoutRedux();
    console.log("this.props.history", this.props.history);
    this.props.history.push("dangnhap");
  };

  render() {
    return (
      <div className="navbar">
        <div className="navbar-container">
          <NavLink to="/" exact className="navbar-logo">
            <img src={LogoImage} alt=""></img>
            {/* Trang chủ */}
          </NavLink>
          {/* <NavLink to="/list-todo">Danh sách công việc</NavLink>
                <NavLink to="/my-component">Component của Phong</NavLink> */}
          {/* <NavLink to="/user">Quản lí người dùng</NavLink> */}

          <ul className="menu-list">
            <li>
              <NavLink to="/account">Khách hàng</NavLink>
              {/* <NavLink to="/account">客 户</NavLink> */}
            </li>

            <li>
              <NavLink to="/category">Danh mục</NavLink>
              {/* <NavLink to="/category">类 别</NavLink> */}
            </li>

            <li>
              <NavLink to="/product">Sản phẩm</NavLink>
              {/* <NavLink to="/product">产 品</NavLink> */}
            </li>

            <li>
              <NavLink to="/orders">Đơn hàng</NavLink>
              {/* <NavLink to="/orders">命 令</NavLink> */}
            </li>

            <li>
              <NavLink to="/doanhso">Doanh thu</NavLink>
              {/* <NavLink to="/doanhso">收 入</NavLink> */}
            </li>

            {/* <NavLink to="/chiTiet">Chi tiết sản phẩm</NavLink> */}
          </ul>

          <ul className="logout">
            <li>
              <NavLink to="/" onClick={() => this.logout()}>
                {/* 登 出 */}
                Đăng xuất
              </NavLink>
            </li>
          </ul>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));
