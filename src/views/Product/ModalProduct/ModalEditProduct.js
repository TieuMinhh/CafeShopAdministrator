import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ModalProduct.scss";

class ModalEditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id_category: "",
      detail: "",
      price: "",
      images: "",
      avatar: {
        selectedFile: null,
      },
      listCategory: [],
    };
  }

  async componentDidMount() {
    let response = await axios.get(
      "http://localhost:8081/api/v1/category?id=ALL"
    );
    this.setState({
      listCategory: response.data.listCategory,
    });
    console.log("Hello");
    let { productEdit } = this.props;
    console.log("Edit: ", productEdit, productEdit.name_product);
    if (productEdit) {
      this.setState({
        name: productEdit.name_product,
        detail: productEdit.detail,
        price: productEdit.price,
        id_category: productEdit.id_category,
        // img: categoryEdit.logo
      });
    }
    let element = document.getElementById("phong");
    console.log(element.value);
    element.value = this.state.id_category;
  }

  handleOnChangeInput = (event, id) => {
    // this.setState({
    //     item: event.target.value
    // }, () => console.log(this.state.email))

    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    console.log("Minh new:", event.target.value);
    this.setState(
      {
        ...copyState,
      },
      () => {
        let element = document.getElementById("phong");
        console.log("Minh:", element.value);
        element.value = this.state.id_category;
      }
    );
  };

  fileSelectedHandle = (event) => {
    if (event && event.target && event.target.files[0]) {
      this.setState({
        avatar: {
          ...this.state.avatar.selectedFile,
          selectedFile: event.target.files[0],
        },
      });

      const file = event.target.files[0];
      file.preview = URL.createObjectURL(file);
      this.setState({
        images: file.preview,
      });
    } else {
      this.setState({
        images: "",
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["name", "id_category", "detail", "price"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Vui lòng nhập: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleUpdateProduct = async (id_product, id_category) => {
    let check = this.checkValidateInput();
    if (check) {
      const { name, detail, price, id_category } = this.state;
      const { selectedFile } = this.state.avatar;

      const fd = new FormData();
      fd.append("name", name); //Tên sản phẩm
      fd.append("detail", detail); //Chi tiết
      fd.append("price", price); //Giá
      fd.append("id_category", id_category); //Id danh mục

      if (selectedFile && selectedFile.name) {
        fd.append("images", selectedFile); //ảnh
        console.log(fd);
      }

      // console.log(fd.get('logo'));
      // console.log(fd);
      console.log("Query 2 cái: ", id_product, id_category);
      let token = localStorage.getItem("user");
      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let response = await axios.post(
        `http://localhost:8081/api/v1/admin/updateProduct/${id_product}/${id_category}`,
        fd
      );

      // this.props.toggleCuaCha()
      this.props.toggleEditProduct();
      // alert(response.data.message)
      if (response.data.errCode === 0) toast.success(response.data.message);
      else toast.success(response.data.message);

      this.props.getAllProductFromReact();
      console.log(response);
    }
  };

  // selectElement = (id, valueToSelect) => {
  //     let element = document.getElementById(id);
  //     element.value = valueToSelect;
  // }

  // selectElement('leaveCode', '11');
  render() {
    let { listCategory } = this.state;
    let pro = this.props.productEdit;
    console.log("Phong pro: ", pro);
    console.log(
      "Ten va anh:",
      this.state.name,
      this.state.img,
      this.state.avatar
    );
    return (
      <>
        <Modal
          show={this.props.isOpenEdit}
          onHide={this.props.toggleEditProduct}
          size="m"
        >
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="formName">
                <Form.Label>Nhập tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.handleOnChangeInput(event, "name")}
                  value={this.state.name}
                />
              </Form.Group>
            </Form>

            <Form.Group controlId="formImage">
              <Form.Label>Chọn ảnh sản phẩm</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => this.fileSelectedHandle(event)}
              />
              {this.state.images ? (
                <img
                  src={this.state.images}
                  height={90}
                  width={90}
                  alt="img"
                  className="d-block"
                ></img>
              ) : (
                <img
                  src={`http://localhost:8081/image/${pro.images}`}
                  height={90}
                  width={90}
                  alt="img"
                  className="d-block"
                ></img>
              )}
            </Form.Group>

            <Form.Group className="mb-2" controlId="formDetail">
              <Form.Label>Nhập chi tiết sản phẩm</Form.Label>
              <Form.Control
                type="text"
                onChange={(event) => this.handleOnChangeInput(event, "detail")}
                value={this.state.detail}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPrice">
              <Form.Label>Nhập giá sản phẩm</Form.Label>
              <Form.Control
                type="number"
                onChange={(event) => this.handleOnChangeInput(event, "price")}
                value={this.state.price}
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formCategory">
              <Form.Label>Chọn danh mục sản phẩm</Form.Label>
              <Form.Control
                id="phong"
                as="select"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "id_category")
                }
              >
                <option>Chọn Danh Mục</option>
                {listCategory &&
                  listCategory.map((item, index) => {
                    return (
                      <>
                        <option key={item.id} value={item.id_category}>
                          {item.name}
                        </option>
                      </>
                    );
                  })}
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() =>
                this.handleUpdateProduct(pro.id_product, pro.id_category)
              }
            >
              Cập nhật
            </Button>
            <Button variant="secondary" onClick={this.props.toggleEditProduct}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
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
)(withRouter(ModalEditProduct));
