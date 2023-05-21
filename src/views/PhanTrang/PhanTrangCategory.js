import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./PhanTrang.scss";

const moment = require("moment");
class PhanTrangCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPhanTrang: [1, 2, 3, 4, 5, 6],
      page_size: "",
      page_current: "",
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
    let response = await axios.get("http://localhost:8081/api/v1/testthu");

    this.setState({
      listCategory: response.data.listCategory,
      page_size: response.data.page_size,
    });
  }

  render() {
    let listCategory = this.state.listCategory;
    let page_size = this.state.page_size;
    console.log("Hien tai: ", this.props.pageHienTai);
    return (
      <>
        <nav aria-label="Page navigation example" className="main-phantrang">
          <ul className="pagination phantrang">
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() =>
                  this.props.handleListCategory(this.props.pageHienTai - 1)
                }
              >
                <FaChevronLeft />
              </a>
            </li>
            {listCategory &&
              listCategory
                .slice(0, Math.ceil(this.props.pageLength / page_size))
                .map((item, index) => {
                  return (
                    <li className="page-item">
                      {" "}
                      <a
                        className="page-link"
                        onClick={() => this.props.handleListCategory(index + 1)}
                        href="#"
                      >
                        {index + 1}
                      </a>
                    </li>
                  );
                })}
            {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li> */}
            <li className="page-item">
              <a
                className="page-link"
                onClick={() =>
                  this.props.handleListCategory(this.props.pageHienTai + 1)
                }
                href="#"
              >
                <FaChevronRight />
              </a>
            </li>
          </ul>
        </nav>
      </>
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
)(withRouter(PhanTrangCategory));
