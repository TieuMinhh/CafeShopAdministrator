import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Form, Modal } from "react-bootstrap";

import "./ModalCategory.scss";
import { toast } from "react-toastify";

class ModalEditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      img: "",
      avatar: {
        selectedFile: null,
      },
    };
  }

  async componentDidMount() {
    console.log("Hello");
    let { categoryEdit } = this.props;
    console.log("Edit: ", categoryEdit, categoryEdit.name);
    if (categoryEdit) {
      this.setState({
        name: categoryEdit.name,
        // img: categoryEdit.logo
      });
    }
  }

  handleOnChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleOnChangeImg = (event) => {
    this.setState({
      img: event.target.value,
    });
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
        img: file.preview,
      });
    } else {
      this.setState({
        img: "",
      });
    }
  };

  handleUpdateCategory = async (id_category) => {
    const { name } = this.state;
    const { selectedFile } = this.state.avatar;

    const fd = new FormData();
    fd.append("name", name);
    if (selectedFile && selectedFile.name) {
      fd.append("logo", selectedFile, selectedFile.name);
      console.log(fd);
    }

    let token = localStorage.getItem("user");
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let response = await axios.post(
      `http://localhost:8081/api/v1/admin/updateCategory?id=${id_category}`,
      fd
    );
    console.log(response);
    this.props.toggleEditCategory();
    // alert(response.data.message)

    if (response.data.errCode === 0) toast.success(response.data.message);
    else toast.success(response.data.message);

    this.props.getAllCategoryFromReact();
  };

  render() {
    let cat = this.props.categoryEdit;
    console.log("Edit: ", this.props.categoryEdit, cat.name);
    console.log("Ten va anh:", this.state.img);
    return (
      <>
        <Modal
          show={this.props.isOpenEdit}
          onHide={this.props.toggleEditCategory}
          size="m"
        >
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa danh mục</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2" controlId="formName">
                <Form.Label>Nhập tên danh mục</Form.Label>
                <Form.Control
                  type="text"
                  // placeholder="Nhập tên danh mục"
                  onChange={(event) => this.handleOnChangeName(event)}
                  value={this.state.name}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Chọn ảnh danh mục</Form.Label>
                <Form.Control
                  // placeholder="Chọn ảnh danh mục"
                  type="file"
                  onChange={(event) => this.fileSelectedHandle(event)}
                />
                {this.state.img ? (
                  <img
                    src={this.state.img}
                    height={90}
                    width={90}
                    alt="img-change"
                    className="d-block"
                  ></img>
                ) : (
                  <img
                    src={`http://localhost:8081/image/${cat.logo}`}
                    height={90}
                    width={90}
                    alt="img-change"
                    className="d-block"
                  ></img>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => this.handleUpdateCategory(cat.id_category)}
            >
              Cập nhật
            </Button>{" "}
            <Button variant="secondary" onClick={this.props.toggleEditCategory}>
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
)(withRouter(ModalEditCategory));
