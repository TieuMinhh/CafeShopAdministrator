import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchCategory.scss";

const moment = require("moment");
class SearchCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  async componentDidMount() {}

  handleOnChangeName = (event) => {
    this.setState(
      {
        name: event.target.value,
      },
      console.log("Text search:", this.state.name)
    );
  };

  searchCategory = async () => {
    let response = await axios.post(
      `http://localhost:8081/api/v1/search-category`,
      { name: this.state.name }
    );
    console.log(response.data.message);
    this.props.getSearchCategory(response.data.message);
  };

  render() {
    return (
      <div className="category-main-search">
        <div className="main-search">
          <input
            type="search"
            id="form1"
            className="form-control"
            placeholder="Nhập tên danh mục ..."
            onChange={(event) => this.handleOnChangeName(event)}
            value={this.state.name}
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.searchCategory()}
          >
            <FaSearch />
          </button>
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
)(withRouter(SearchCategory));
