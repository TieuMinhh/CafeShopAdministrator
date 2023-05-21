import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { Button, Modal } from "react-bootstrap";
import "./Order.scss";
const moment = require("moment");
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      logo: "",
      isShowHidePassword: false,
      errMessage: "",
      listOrder: [],
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
    this.getAllOrder();
  }

  getAllOrder = async () => {
    // this.getAllProductFromReact()
    let token = localStorage.getItem("user");
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let response = await axios.get(
      `http://localhost:8081/api/v1/admin/getorders`
    );
    console.log(response.data);
    this.setState({
      listOrder: response.data.listOrder,
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
    this.getAllOrder();
  };

  handleHoanThanh = async (item) => {
    console.log(item.id_order);
    let response = await axios.post(
      `http://localhost:8081/api/v1//admin/hoanthanhdonhang/${item.id_order}`
    );
    console.log(response);
    this.getAllOrder();
  };
  handleHuyDon = async (item) => {
    let response = await axios.post(
      `http://localhost:8081/api/v1//admin/huydonhang/${item.id_order}`
    );
    this.getAllOrder();
  };

  handleXemChiTietDatHang = (item) => {
    console.log(item.id_order);
    this.props.orderdetail(item.id_order);
    this.props.history.push("/orderdetail");
  };

  render() {
    let listOrder = this.state.listOrder;
    console.log("redux id_category: ", listOrder);
    return (
      <div className="order-main-container">
        <div className="d-flex justify-content-center title-order">
          Danh sách đơn đặt hàng
        </div>
        <div className="table-order">
          <table id="main-order">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Tên khách hàng</th>
                <th>Địa chỉ</th>
                <th>Thời gian đặt</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
                <th>Chi tiết</th>
              </tr>
              {
                //0 đã hoàn thành
                //1 chờ xác nhận
                //2 đang giao
                //3 Đã hủy           =>xóa luôn đơn
                listOrder &&
                  listOrder.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {/* <td><img src={`http://localhost:8081/image/${item.images}`} alt="" height={150} width={150} /></td> */}
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>
                          {/* {item.created_time.Format('DD-MM-YYYY')} */}

                          {moment(item.order_time).format("DD-MM-YYYY ")}
                        </td>
                        {/* <td>{item.status && item.status == 0 && Đã hoàn thành}</td> */}
                        {item.status === 0 ? (
                          <>
                            {" "}
                            <td style={{ color: "blue" }}>
                              Đã hoàn thành
                            </td>{" "}
                            <td></td>{" "}
                          </>
                        ) : item.status === 1 ? (
                          <>
                            <td style={{ color: "#FFD700" }}>Chờ xác nhận</td>{" "}
                            <td>
                              <button
                                className="btn-submit btn-primary"
                                onClick={() => this.handleXacNhan(item)}
                              >
                                Xác nhận
                              </button>
                              <button
                                className="btn-cancel btn-primary"
                                onClick={() => this.handleHuyDon(item)}
                              >
                                Hủy đơn
                              </button>
                            </td>
                          </>
                        ) : item.status === 2 ? (
                          <>
                            <td style={{ color: "green" }}>Đang giao</td>{" "}
                            <td>
                              <button
                                className="btn-complete btn-primary"
                                onClick={() => this.handleHoanThanh(item)}
                              >
                                Hoàn thành
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td style={{ color: "red" }}>Đã hủy</td>
                            <td></td>
                          </>
                        )}
                        {/* {item.status && item.status === 0 && <td>Đã hoàn thành</td>}
                                            {item.status && item.status === 1 && <td>Chờ xác nhận</td>}
                                            {item.status && item.status === 2 && <td>Đang giao</td>} */}
                        {/* <td>{item.created_time}</td> */}

                        <td>
                          <button
                            className="btn-detail"
                            onClick={() => this.handleXemChiTietDatHang(item)}
                          >
                            Xem chi tiết
                          </button>
                        </td>
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
    orderdetail: (id_order) =>
      dispatch({ type: "id_order", payload: id_order }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Order));
