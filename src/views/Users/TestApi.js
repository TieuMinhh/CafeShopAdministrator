import React from "react";
import axios from "axios";
class TestApi extends React.Component {
    state = {
        product: [], hello: 'phong ne'
    }

    async componentDidMount() {
        let res = await axios.get('http://localhost:8081/api/v1/product');
        console.log(res);
        this.setState({
            product: res && res.data && res.data.dataProduct ? res.data.dataProduct : []
        })
    }
    render() {
        let { product } = this.state
        console.log(product);
        return (<>
            <div> {this.state.hello}
            </div>
            {

                product.map(
                    (item, index) => {
                        return (<>
                            <div> {index + 1} Quần áo: {item.name}
                            </div>
                            <div> Chi tiết:{item.detail}
                            </div>
                            <div> Giá: {item.price}
                            </div>

                        </>)
                    }
                )
            }</>

        )
    }
}

export default TestApi;