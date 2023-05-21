import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import "./ModalCategory.scss";
import { toast } from "react-toastify";

class ModalCategory extends Component {
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

  async componentDidMount() {}

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
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["name", "img"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        if (arrInput[i] === "name") {
          toast.warn("Vui lòng nhập : Tên danh mục ");
        } else if (arrInput[i] === "img") {
          toast.warn("Vui lòng chọn : Ảnh danh mục");
        }
        break;
      }
    }
    return isValid;
  };

  handleAddNewCategory = async () => {
    let check = this.checkValidateInput();
    if (check) {
      const { name } = this.state;
      const { selectedFile } = this.state.avatar;

      const fd = new FormData();
      fd.append("name", name);
      fd.append("logo", selectedFile);
      console.log("selectedFile.name: ", selectedFile.name);
      console.log(fd.get("logo"));
      // console.log(fd);

      // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
      let token = localStorage.getItem("user");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let response = await axios.post(
        "http://localhost:8081/api/v1/admin/createcategory",
        fd
      );
      this.setState({
        name: "",
        img: "",
        avatar: {
          selectedFile: null,
        },
      });
      this.props.toggleCuaCha();
      // alert(response.data.message)
      if (response.data.errCode === 0) toast.success(response.data.message);
      else toast.warn(response.data.message);

      this.props.getAllCategoryFromReact();
      console.log(response);
    }
  };

  render() {
    console.log(
      "Ten va anh:",
      this.state.name,
      this.state.img,
      this.state.avatar
    );
    return (
      <>
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
                <Form.Label>Nhập tên danh mục</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="什 么 东 西"
                  onChange={(event) => this.handleOnChangeName(event)}
                  value={this.state.name}
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Chọn ảnh danh mục</Form.Label>
                <Form.Control
                  type="file"
                  // placeholder="Chọn ảnh danh mục"
                  onChange={this.fileSelectedHandle}
                />
                {this.state.img && (
                  <img
                    src={this.state.img}
                    height={90}
                    width={90}
                    alt="img"
                    className="d-block"
                  />
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.handleAddNewCategory}>
              Thêm
            </Button>
            <Button variant="secondary" onClick={this.props.toggleCuaCha}>
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
)(withRouter(ModalCategory));
