import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
// import { FaTrash, FaPencilAlt } from "react-icons/fa";
import "./DoanhSo.scss";

const moment = require("moment");
class DoanhSo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      logo: "",
      isShowHidePassword: false,
      errMessage: "",
      listDoanhSo: [],
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
      `http://localhost:8081/api/v1/admin/doanhso`
    );
    console.log("Detial:", response);
    this.setState({
      listDoanhSo: response.data.listDoanhSo,
    });
  }

  render() {
    let listDoanhSo = this.state.listDoanhSo;
    let total = this.state.total;
    console.log("redux id_category: ", listDoanhSo);
    return (
      <div className="revenue-main-container">
        <div className="d-flex justify-content-center revenue-title">
          Thống kê doanh thu
        </div>
        <div className="table-revenue">
          <table id="main-revenue">
            <tbody>
              <tr>
                <th>STT</th>

                <th>Ngày đặt</th>
                <th>Doanh số</th>
              </tr>
              {
                //0 đã hoàn thành
                //1 chờ xác nhận
                //2 đang giao
                //3 Đã hủy =>xóa luôn đơn
                listDoanhSo &&
                  listDoanhSo.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        {/* <td><img src={`http://localhost:8081/image/${item.images}`} alt="" height={150} width={150} /></td> */}

                        <td>{moment(item.ngay).format("DD-MM-YYYY ")}</td>
                        <td>
                          {Number(item.total_doanhso).toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}{" "}
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
    product: (id_product) =>
      dispatch({ type: "id_product", payload: id_product }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DoanhSo));
