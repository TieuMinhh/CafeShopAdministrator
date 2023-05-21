import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { FaTrash, FaPencilAlt } from "react-icons/fa";

import "./Account.scss";
// import './Order.scss'
const moment = require("moment");
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      logo: "",
      isShowHidePassword: false,
      errMessage: "",
      listAccount: [],
      id_category: "",
      arrProduct: [],
      isOpen: false,
      isOpenEdit: false,
      isOpenDelete: false,
      productEdit: [],
      date: "",
    };
  }

  async componentDidMount() {
    // this.getAllProductFromReact()
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
    let token = localStorage.getItem("user");
    console.log(token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // let response = await axios.get(`http://localhost:8081/api/v1/admin/getorders`)
    // console.log(response.data);
    // this.setState({
    //     listOrder: response.data.listOrder
    // })
    console.log(this.props.reduxState.id_order);
    let response = await axios.get(
      `http://localhost:8081/api/v1/admin/account`
    );
    console.log("Detial:", response);
    this.setState({
      listAccount: response.data.listAccount,
    });
  }

  getAllProductFromReact = async () => {
    let response = await axios.get(
      `http://localhost:8081/api/v1//admin/product?id=${this.props.reduxState.id_category}`
    );
    console.log(response.data);
    console.log("hello chi tiet nè");
    this.setState({
      listProduct: response.data.listProduct,
    });
  };

  handleEditProduct = (product) => {
    this.setState({
      isOpenEdit: true,
      productEdit: product,
    });
  };
  handleDeleteProduct = (product) => {
    this.setState({
      isOpenDelete: true,
      productDelete: product,
    });
  };

  handleXacNhan = async (item) => {
    console.log(item.id_order);
    let response = await axios.post(
      `http://localhost:8081/api/v1//admin/xacnhandonhang/${item.id_order}`
    );
    console.log(response);
  };

  handleHoanThanh = async (item) => {
    console.log(item.id_order);
    let response = await axios.post(
      `http://localhost:8081/api/v1//admin/hoanthanhdonhang/${item.id_order}`
    );
    console.log(response);
  };
  handleHuyDon = async (item) => {
    let response = await axios.post(
      `http://localhost:8081/api/v1//admin/huydonhang/${item.id_order}`
    );
  };

  handleXemChiTietDatHang = () => {};
  render() {
    let listAccount = this.state.listAccount;
    console.log("redux id_category: ", listAccount);
    return (
      <div className="account-main-container">
        <div className="d-flex justify-content-center title-account">
          Danh sách khách hàng
        </div>
        <div className="table-user-account">
          <table id="customers-account">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Ảnh đại diện</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>

                <th>Địa chỉ</th>

                {/* email phone name address avatar */}
              </tr>
              {
                //0 đã hoàn thành
                //1 chờ xác nhận
                //2 đang giao
                //3 Đã hủy =>xóa luôn đơn
                listAccount &&
                  listAccount.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`http://localhost:8081/image/${item.avatar}`}
                            alt="user-avatar"
                            className="avatar-image"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>

                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
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
    product: (id_product) =>
      dispatch({ type: "id_product", payload: id_product }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Account));
