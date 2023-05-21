import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Modal } from "react-bootstrap";
import "./ModalCategory.scss";
import { toast } from "react-toastify";

class ModalDeleteCategory extends Component {
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
    console.log(this.props.categoryDelete);
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

  handleDeleteCategory = async (id_category) => {
    let token = localStorage.getItem("user");
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    let response = await axios.delete(
      `http://localhost:8081/api/v1/admin/deletecategory?id_category=${id_category}`
    );
    // localhost:8081/api/v1/admin/deletecategory?id_category=53
    console.log(response);
    // alert(response.data.message)

    if (response.data.errCode === 0) toast.success(response.data.message);
    else toast.success(response.data.message);

    this.props.toggleDeleteCategory();
    this.props.getAllCategoryFromReact();
    console.log(response);
  };

  render() {
    console.log("Ten va anh 1:", this.props.categoryDelete);
    let categoryDelete = this.props.categoryDelete;
    return (
      <>
        <Modal
          show={this.props.isOpenDelete}
          onHide={this.props.toggleDeleteCategory}
          size="m"
        >
          <Modal.Header closeButton>
            <Modal.Title>Xoá danh mục</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-category-body text-center">
              <div className="delete-container">
                <label className="ban-co-muon-xoa">
                  Ngài có chắc chắn muốn xóa danh mục : {categoryDelete.name}
                </label>
                <img
                  src={`http://localhost:8081/image/${categoryDelete.logo}`}
                  height={150}
                  width={150}
                  alt="img"
                />
                {/* <input type='file' onChange={(event) => this.fileSelectedHandle(event)}></input> */}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() =>
                this.handleDeleteCategory(categoryDelete.id_category)
              }
            >
              Đồng ý
            </Button>
            <Button variant="success" onClick={this.props.toggleDeleteCategory}>
              Không
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
)(withRouter(ModalDeleteCategory));
