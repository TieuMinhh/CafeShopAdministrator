import axios from "axios";
import React from "react";
import './ListUser.scss'
import { withRouter } from "react-router-dom";
class ListUser extends React.Component {
    state = {
        list: []
    }

    async componentDidMount() {
        let res = await axios.get('https://reqres.in/api/users')
        //let res = await axios.get('localhost:8081/api/v1/product')
        this.setState({
            list: res && res.data && res.data.data ? res.data.data : []
        })
        console.log(res);
    }

    handleViewDetailUser = (users) => {
        // console.log(this.props);
        this.props.history.push(`/user/${users.id}`)
    }

    render() {
        let { list } = this.state
        return (
            <div className="list-user-container">
                <div className="title"> Fetch all list user</div>
                <div className="list-user-content">
                    {
                        list && list.length > 0 && list.map((item, index) => {
                            return (
                                <div className="child" onClick={() => this.handleViewDetailUser(item)}> {index + 1} - {item.first_name} {item.last_name}  </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}

export default withRouter(ListUser)