import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { FaTrash, FaPencilAlt } from "react-icons/fa";
import "./OrderDetail.scss";
const moment = require("moment");
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      logo: "",
      isShowHidePassword: false,
      errMessage: "",
      listOrderDetail: [],
      id_category: "",
      arrProduct: [],
      isOpen: false,
      isOpenEdit: false,
      isOpenDelete: false,
      productEdit: [],
      date: "",
      total: "",
    };
  }

  async componentDidMount() {
    // this.getAllProductFromReact()
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    // let response = await axios.get(`http://localhost:8081/api/v1/admin/getorders`)
    // console.log(response.data);
    // this.setState({
    //     listOrder: response.data.listOrder
    // })
    console.log(this.props.reduxState.id_order);
    let response = await axios.get(
      `http://localhost:8081/api/v1/admin/detailorder/${this.props.reduxState.id_order}`
    );
    console.log("Detial:", response);
    this.setState({
      listOrderDetail: response.data.listOrderDetail,
      total: response.data.total,
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

  getDate = (today) => {
    today = new Date();
    console.log("Today:", today);
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    this.setState({ date });
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
    let listOrderDetail = this.state.listOrderDetail;
    let total = this.state.total;
    console.log("redux id_category: ", listOrderDetail);
    return (
      <div className="order-detail-main-container">
        <div className="d-flex justify-content-center order-detail-title">
          Danh sách sản phẩm{" "}
        </div>
        <div className="table-order-detail">
          <table id="main-order-detail">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Tên món</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
              </tr>
              {
                //0 đã hoàn thành
                //1 chờ xác nhận
                //2 đang giao
                //3 Đã hủy =>xóa luôn đơn
                listOrderDetail &&
                  listOrderDetail.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {/* <td><img src={`http://localhost:8081/image/${item.images}`} alt="" height={150} width={150} /></td> */}
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>
                          {item.price.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    );
                  })
              }
              <h2 className="total-price">
                Tổng :{" "}
                {total.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </h2>
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
)(withRouter(OrderDetail));
