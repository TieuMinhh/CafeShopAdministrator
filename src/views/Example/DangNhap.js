import React from "react";
import { Redirect, withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Login.scss";
import axios from "axios";
import { toast } from "react-toastify";

import facebookImage from "../../assets/images/facebook.png";
import instagramImage from "../../assets/images/instagram.png";
import linkedinImage from "../../assets/images/linkedin.png";
import twitterImage from "../../assets/images/twitter.png";

class DangNhap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMessage: "",
      checkLogin: false,
    };
  }
  componentDidMount() {
    // const dangnhap = localStorage.getItem('dangnhap')
    // this.setState({
    //     checkLogin: dangnhap
    // })
    if (!this.props.reduxState.isDangNhap) {
      console.log("ComponentDidmout DangNhap");
    } else {
      this.props.history.push("");
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
    console.log(event.target.value);
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    //ý tưởng:
    // Sau khi ấn đăng nhập
    // Lư
    /*
        Sau khi ấn đăng nhập
        Gọi api lấy token 
        1. Lưu token vào local
        2. 

        */
    console.log(this.props.reduxState);
    const { email, password } = this.state;
    // console.log(email, password);
    let response = await axios.post(
      `http://localhost:8081/api/v1/admin/login`,
      { email, password }
    );
    // console.log(response);

    if (response.data.errCode === 0) {
      toast.success(response.data.message);
      localStorage.setItem("user", response.data.userData);
      this.props.dangNhap();
      // this.props.history.push("/account");
      this.props.history.push("");
    } else toast.error(response.data.message);

    // console.log(response);
    // this.setState({
    //     checkLogin: true
    // })
    // this.props.history.push('')
    // this.props.dangNhap()
  };
  render() {
    console.log("Test thu: ", this.props.reduxState);
    //    const mainJSX = checkLogin?
    return (
      <div className="login-page">
        <div className="account-container">
          <div className="form">
            <h2>Đăng Nhập</h2>
            <label>
              <span>Email</span>
              <input
                type="text"
                id="login-name"
                name="name"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeEmail(event)}
              ></input>
            </label>
            <label>
              <span>Mật Khẩu</span>
              <input
                type="password"
                id="login-password"
                name="password"
                value={this.state.password}
                onChange={(event) => this.handleOnChangePassword(event)}
              ></input>
            </label>

            <button
              id="login-submit"
              className="submit"
              type="button"
              onClick={() => this.handleLogin()}
            >
              Đăng Nhập
            </button>

            <p className="forgot-pass">Quên Mật Khẩu?</p>

            <div className="social-media">
              <p>Hoặc đăng nhập bằng</p>
              <ul>
                <li>
                  <img src={facebookImage} alt="facebook" />
                </li>
                <li>
                  <img src={twitterImage} alt="twitter" />
                </li>
                <li>
                  <img src={linkedinImage} alt="linkedin" />
                </li>
                <li>
                  <img src={instagramImage} alt="instagram" />
                </li>
              </ul>
            </div>
          </div>

          <div className="sub-login-container">
            <div className="img">
              <div className="img-text m-up">
                <h2>Có gì mới?</h2>
                <p>Truy cập website để tìm kiếm đồ uống ưa thích đi nào</p>
              </div>
              <div className="img-btn">
                <span className="m-up">Đăng Ký</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      // <div className='add-todo'>
      //     < div >
      //         <label>Email: </label>
      //         <input type='text' className='form-control'
      //             value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)} placeholder='Enter your username'></input>
      //     </div >
      //     <div>
      //         <label>Password: </label>
      //         <input type='password'
      //             value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)} placeholder='Enter your password'></input>
      //     </div>
      //     <button onClick={() => this.handleLogin(history)}>Login</button>

      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reduxState: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dangNhap: () => dispatch({ type: "daDangNhap", payload: true }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DangNhap));
