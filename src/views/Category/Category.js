import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./Category.scss";
import { withRouter } from "react-router-dom";
import ModalCategory from "./ModalCategory/ModalCategory";
import { FaTrash, FaPencilAlt, FaPlus } from "react-icons/fa";
import ModalEditCategory from "./ModalCategory/ModalEditCategory";
import ModalDeleteCategory from "./ModalCategory/ModalDeleteCategory";
import PhanTrang from "../PhanTrang/PhanTrangCategory";
import SearchCategory from "../SearchCategory/SearchCategory";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      logo: "",
      listCategory: [],
      id_category: "",
      arrProduct: [],
      isOpen: false,
      isOpenEdit: false,
      isOpenDelete: "",
      categoryEdit: "",
      categoryDelete: "",
      pageHienTai: "",
      pageLength: "",
    };
  }

  async componentDidMount() {
    await this.getAllCategoryFromReact();
    // let response = await axios.get('http://localhost:8081/api/v1/category?id=ALL')
    // this.setState({
    //     listCategory: response.data.listCategory
    // })
    // console.log(response.data.listCategory);
  }

  getAllCategoryFromReact = async () => {
    // let response = await axios.get('http://localhost:8081/api/v1/category?id=ALL')
    let response = await axios.get("http://localhost:8081/api/v1/testthu");
    this.setState({
      listCategory: response.data.listCategory,
      pageLength: response.data.listCategory.length,
    });
    console.log("heelo state: ", this.state.listCategory);
  };

  sanPhamDanhMuc = (id_category) => {
    console.log("San pham theo danh muc: ", id_category);
    this.props.category(id_category);
    console.log("This props: ", this.props);
    this.props.history.push("detailProduct");
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  toggleEditCategory = () => {
    this.setState({
      isOpenEdit: !this.state.isOpenEdit,
    });
  };

  toggleDeleteCategory = () => {
    this.setState({
      isOpenDelete: !this.state.isOpenDelete,
    });
  };

  handleEditCategory = (category) => {
    this.setState({
      isOpenEdit: true,
      categoryEdit: category,
    });
  };
  handleDeleteCategory = (category) => {
    this.setState({
      isOpenDelete: true,
      categoryDelete: category,
    });
  };
  handleListCategory = async (page) => {
    console.log("Page: ", page);
    let response = await axios.get(
      `http://localhost:8081/api/v1/testthu?page=${page}`
    );
    this.setState({
      listCategory: response.data.listCategory,
      pageHienTai: page,
    });
    console.log("heelo state: ", this.state.listCategory);
  };

  getSearchCategory = (listCategory) => {
    this.setState({
      listCategory: listCategory,
    });
  };
  render() {
    let listCategory = this.state.listCategory;
    console.log("Danh muc: ", this.state.categoryEdit);
    return (
      <div className="category-main-container">
        <ModalCategory
          isOpen={this.state.isOpen}
          toggleCuaCha={() => this.toggle()}
          getAllCategoryFromReact={() => this.getAllCategoryFromReact()}
        />
        {this.state.isOpenEdit && (
          <ModalEditCategory
            isOpenEdit={this.state.isOpenEdit}
            toggleEditCategory={() => this.toggleEditCategory()}
            categoryEdit={this.state.categoryEdit}
            getAllCategoryFromReact={() => this.getAllCategoryFromReact()}
          />
        )}
        {this.state.isOpenDelete && (
          <ModalDeleteCategory
            isOpenDelete={this.state.isOpenDelete}
            toggleDeleteCategory={() => this.toggleDeleteCategory()}
            categoryDelete={this.state.categoryDelete}
            getAllCategoryFromReact={() => this.getAllCategoryFromReact()}
          />
        )}

        <div className="d-flex justify-content-center title-category">
          Danh mục sản phẩm
        </div>
        <SearchCategory
          className="search-category"
          getSearchCategory={(listCategory) =>
            this.getSearchCategory(listCategory)
          }
          getAllCategoryFromReact={() => this.state.getAllCategoryFromReact}
        />
        <button
          className="btn btn-success add-category-btn"
          onClick={() => this.toggle()}
        >
          <FaPlus />
        </button>
        <div className="table-category">
          <table id="main-category">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Thao tác</th>
              </tr>
              {listCategory &&
                listCategory.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:8081/image/${item.logo}`}
                          alt=""
                          className="avatar-image"
                        />
                      </td>

                      <td>{item.name}</td>

                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditCategory(item)}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteCategory(item)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* {
                        listCategory && listCategory.map((item, index) => {
                            return (
                                <div className='container' onClick={() => this.sanPhamDanhMuc(item.id_category)}>
                                    {item.name} + {item.logo}

                                </div>

                            )
                        })
                    } */}
          <PhanTrang
            handleListCategory={(page) => this.handleListCategory(page)}
            pageHienTai={this.state.pageHienTai}
            pageLength={this.state.pageLength}
          />
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
    category: (id_category) =>
      dispatch({ type: "id_category", payload: id_category }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Category));
