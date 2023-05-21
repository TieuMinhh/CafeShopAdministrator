import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import ModalProduct from "./ModalProduct/ModalProduct";
import ModalEditProduct from "./ModalProduct/ModalEditProduct";
import ModalDeleteProduct from "./ModalProduct/ModalDeleteProduct";
import "./Product.scss";
import SearchProduct from "../SearchCategory/SearchProduct";
import PhanTrangProduct from "../PhanTrang/PhanTrangProduct";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      logo: "",
      isShowHidePassword: false,
      errMessage: "",
      listProduct: [],
      id_category: "",
      arrProduct: [],
      isOpen: false,
      isOpenEdit: false,
      isOpenDelete: false,
      productEdit: [],
      pageHienTai: "",
      pageLength: "",
    };
  }

  async componentDidMount() {
    this.getAllProductFromReact();
  }

  getAllProductFromReact = async () => {
    let response = await axios.get(
      `http://localhost:8081/api/v1//admin/product?id=${this.props.reduxState.id_category}`
    );
    console.log(response.data);
    console.log("hello chi tiet nè");
    this.setState({
      listProduct: response.data.listProduct,
      pageLength: response.data.listProduct.length,
    });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleEditProduct = () => {
    this.setState({
      isOpenEdit: !this.state.isOpenEdit,
    });
  };
  toggleDeleteProduct = () => {
    this.setState({
      isOpenDelete: !this.state.isOpenDelete,
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
  sanPhamChiTiet = (id_product) => {
    console.log("San pham theo danh muc: ", id_product);
    this.props.product(id_product);
    console.log("Redux: ", this.props.reduxState);
    this.props.history.push("/chiTiet");
  };

  getSearchProduct = (listProduct) => {
    this.setState({
      listProduct: listProduct,
    });
  };

  handleListProduct = async (page) => {
    console.log("Page: ", page);
    let response = await axios.get(
      `http://localhost:8081/api/v1/testthu-product?page=${page}`
    );
    this.setState({
      listProduct: response.data.listProduct,
      pageHienTai: page,
    });
    console.log("heelo state: ", this.state.listProduct);
  };
  render() {
    let listProduct = this.state.listProduct;
    console.log("redux id_category: ", this.props.reduxState);
    return (
      <div className="product-main-container">
        <ModalProduct
          isOpen={this.state.isOpen}
          toggleCuaCha={() => this.toggle()}
          getAllProductFromReact={() => this.getAllProductFromReact()}
        />
        {this.state.isOpenEdit && (
          <ModalEditProduct
            isOpenEdit={this.state.isOpenEdit}
            toggleEditProduct={() => this.toggleEditProduct()}
            productEdit={this.state.productEdit}
            getAllProductFromReact={() => this.getAllProductFromReact()}
          />
        )}
        {this.state.isOpenDelete && (
          <ModalDeleteProduct
            isOpenDelete={this.state.isOpenDelete}
            toggleDeleteProduct={() => this.toggleDeleteProduct()}
            productDelete={this.state.productDelete}
            getAllProductFromReact={() => this.getAllProductFromReact()}
          />
        )}
        <div className="d-flex justify-content-center title-product">
          Danh sách sản phẩm
        </div>
        <SearchProduct
          getSearchProduct={(listProduct) => this.getSearchProduct(listProduct)}
        />
        <button
          className="btn btn-success add-product-btn"
          onClick={() => this.toggle()}
        >
          <FaPlus />
        </button>
        <div className="table-product">
          <table id="main-product">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th>Thao tác</th>
              </tr>
              {listProduct &&
                listProduct.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:8081/image/${item.images}`}
                          alt=""
                          className="avatar-image"
                        />
                      </td>

                      <td>{item.name_product}</td>
                      <td>
                        {item.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}{" "}
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditProduct(item)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteProduct(item)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <PhanTrangProduct
          handleListProduct={(page) => this.handleListProduct(page)}
          pageHienTai={this.state.pageHienTai}
          pageLength={this.state.pageLength}
        />
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
)(withRouter(Product));
