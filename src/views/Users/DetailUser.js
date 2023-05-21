import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";
class DetailUser extends React.Component {

    state = {
        list: []
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id
            let res = await axios.get(`https://reqres.in/api/users/${id}`)
            this.setState({
                list: res && res.data && res.data.data ? res.data.data : []
            })
            console.log(res.data.data);
        }
    }

    handleBackButton = () => {
        this.props.history.push(`/user`)
    }

    render() {
        // console.log('>>Check props: ', this.props.match.params.id);
        let { list } = this.state;
        let isEmptyObject = Object.keys(list).length === 0
        return (
            <>
                {
                    isEmptyObject === false &&
                    <>
                        <div>
                            Email {list.email}
                        </div>
                        <div>
                            Name: {list.first_name} {list.last_name}
                        </div>
                        <div>
                            <img src={list.avatar}></img>
                        </div>
                        <button type="button" onClick={() => this.handleBackButton()}>
                            Back
                        </button>
                    </>

                }
            </>

        )
    }
}

export default withRouter(DetailUser)