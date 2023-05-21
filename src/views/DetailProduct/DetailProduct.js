import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import './DetailProduct.scss'
class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logo: '',
            isShowHidePassword: false,
            errMessage: '',
            listProduct: [],
            id_category: '',
            arrProduct: [],
        }
    }

    async componentDidMount() {
        let response = await axios.get(`http://localhost:8081/api/v1/chiTiet?id=${this.props.reduxState.id_product}`)
        console.log(response.data);
        this.setState({
            listProduct: response.data.listProduct
        })
    }

    sanPhamChiTiet = (id_product) => {
        console.log('San pham: ', id_product);
        this.props.product(id_product)
        console.log('redux: ', this.props);
    }

    render() {
        let listProduct = this.state.listProduct
        console.log('redux: ', this.props);
        return (
            <div className='main-container1'>
                {
                    listProduct && listProduct.map((item, index) => {
                        return (
                            <>
                                <div className='container1' onClick={() => this.sanPhamChiTiet(item.id_product)}>
                                    <img src={`http://localhost:8081/${item.images}`} className="anh"></img>

                                    <p className='chu-detailProduct'>Tên sản phẩm: {item.name}</p>
                                    <p className='chu-detailProduct'>Giá: {item.price} VNĐ </p>
                                    <p className='chu-detailProduct'>Chi tiết sản phẩm: {item.detail}</p>



                                </div></>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailProduct));
