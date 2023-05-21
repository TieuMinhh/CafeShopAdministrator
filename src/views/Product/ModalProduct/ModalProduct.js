import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import "./ModalProduct.scss";

class ModalProduct extends Component {
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
    console.log("hello state: ", this.state.listCategory);
  }

  handleOnChangeInput = (event, id) => {
    // this.setState({
    //     item: event.target.value
    // }, () => console.log(this.state.email))

    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => console.log("Check: ", this.state)
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
    let arrInput = ["name", "images", "detail", "price", "id_category"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        switch (arrInput[i]) {
          case "name": {
            toast.warn("Vui lòng nhập : Tên sản phẩm ");
            break;
          }
          case "images": {
            toast.warn("Vui lòng chọn : Ảnh sản phẩm ");
            break;
          }
          case "detail": {
            toast.warn("Vui lòng nhập : Chi tiết sản phẩm ");
            break;
          }
          case "price": {
            toast.warn("Vui lòng nhập : Giá sản phẩm ");
            break;
          }
          case "id_category": {
            toast.warn("Vui lòng chọn : Danh mục ");
            break;
          }
          default:
        }
        break;
      }
    }
    return isValid;
  };

  handleAddNewCategory = async () => {
    let check = this.checkValidateInput();
    if (check) {
      const { name, detail, price, id_category } = this.state;
      const { selectedFile } = this.state.avatar;

      const fd = new FormData();
      fd.append("name", name); //Tên sản phẩm
      fd.append("detail", detail); //Chi tiết
      fd.append("price", price); //Giá
      fd.append("id_category", id_category); //Id danh mục
      fd.append("images", selectedFile); //ảnh
      console.log("selectedFile.name: ", selectedFile.name);
      // console.log(fd.get('logo'));
      // console.log(fd);

      let token = localStorage.getItem("user");
      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let response = await axios.post(
        "http://localhost:8081/api/v1/admin/createNewProduct",
        fd
      );
      this.setState({
        name: "",
        id_category: "",
        detail: "",
        price: "",
        images: "",
        avatar: {
          selectedFile: null,
        },
      });
      this.props.toggleCuaCha();
      //   alert(response.data.message);
      if (response.data.errCode === 0) toast.success(response.data.message);
      else toast.success(response.data.message);

      this.props.getAllProductFromReact();
      console.log(response);
    }
  };

  render() {
    let { listCategory } = this.state;
    console.log(
      "Ten va anh:",
      this.state.name,
      this.state.img,
      this.state.avatar
    );
    return (
      <div>
        <Modal
          show={this.props.isOpen}
          onHide={this.props.toggleCuaCha}
          size="m"
        >
          <Modal.Header closeButton>
            <Modal.Title>Thêm danh mục</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="formName">
                <Form.Label>Nhập tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="小 明 奶 茶"
                  onChange={(event) => this.handleOnChangeInput(event, "name")}
                  value={this.state.name}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formImage">
                <Form.Label>Chọn ảnh sản phẩm:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(event) => this.fileSelectedHandle(event)}
                />
                {this.state.images && (
                  <img
                    src={this.state.images}
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
                  placeholder="比 前 男 友 好 吃"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "detail")
                  }
                  value={this.state.detail}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formPrice">
                <Form.Label>Nhập giá sản phẩm</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="50 元"
                  onChange={(event) => this.handleOnChangeInput(event, "price")}
                  value={this.state.price}
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formCategory">
                <Form.Label>Chọn danh mục sản phẩm</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "id_category")
                  }
                  value={this.state.id_category}
                >
                  <option>Chọn danh mục</option>
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => this.handleAddNewCategory()}
            >
              Thêm
            </Button>
            <Button variant="secondary" onClick={this.props.toggleCuaCha}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
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
)(withRouter(ModalProduct));
