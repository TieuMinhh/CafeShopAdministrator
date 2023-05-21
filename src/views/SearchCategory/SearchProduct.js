import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchProduct.scss";

const moment = require("moment");
class SearchProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      textTimKiem: "",
      listCategory: [1, 2, 3],
      id_category: "",
    };
  }

  async componentDidMount() {
    let response = await axios.get("http://localhost:8081/api/v1/testthu");
    this.setState({
      listCategory: response.data.listCategory,
    });
  }

  handleOnChangeName = (event) => {
    this.setState(
      {
        name: event.target.value,
      },
      console.log("Text search:", this.state.name)
    );
  };

  searchProduct = async () => {
    this.setState({
      textTimKiem: this.state.name,
    });
    let response = await axios.post(`http://localhost:8081/api/v1/search`, {
      name: this.state.name,
    });
    console.log(response.data.message);
    this.props.getSearchProduct(response.data.message);
  };

  handleOnChangeInput = (event) => {
    console.log("Hello: ", event.target.value);

    this.setState({
      id_category: event.target.value,
    });
  };

  timKiemTheoDanhMuc = async (event) => {
    // this.props.getSearchProduct(event.target.value)
    let id_category = event.target.value;

    let response = await axios.get(
      `http://localhost:8081/api/v1/admin/product?id=${id_category}`
    );
    this.props.getSearchProduct(response.data.listProduct);
    console.log(response.data);
  };
  render() {
    return (
      <>
        <div className="product-main-search">
          {this.state.textTimKiem && (
            <h4>Bạn vừa tìm kiếm sản phẩm: {this.state.textTimKiem}</h4>
          )}
          <div className="main-search">
            <input
              type="search"
              id="form1"
              className="form-control"
              placeholder="Tìm kiếm sản phẩm ..."
              onChange={(event) => this.handleOnChangeName(event)}
              value={this.state.name}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => this.searchProduct()}
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="product-main-search">
          <div className="main-filter">
            <p className="filter-product">Lọc theo danh mục:</p>
            <select
              className="select-product"
              onChange={(event) => this.handleOnChangeInput(event)}
              onClick={(event) => this.timKiemTheoDanhMuc(event)}
            >
              <option>ALL</option>

              {this.state.listCategory &&
                this.state.listCategory.map((item, index) => {
                  return (
                    <>
                      <option key={item.id} value={item.id_category}>
                        {item.name}
                      </option>
                    </>
                  );
                })}
              {/* <input onChange={(event) => this.handleOnChangeInput(event, 'id_category')} value={item.id_category} hidden></input> */}
            </select>
          </div>
        </div>
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
)(withRouter(SearchProduct));
