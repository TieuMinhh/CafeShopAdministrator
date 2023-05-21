import axios from 'axios';
import React from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify'
import global from '../../global/global'


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    login = async () => {
        // console.log(this.state.username, this.state.password);
        // let res = await axios.post('http://localhost:8081/api/v1/login'
        //     , { email: this.state.username, password: this.state.password })
        // console.log(res.data);
        localStorage.setItem('user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2Nvd…xNTN9.VxS4iA_YPksctx2WlDLefkMPitTN-IaLyiz1B8JmRxA')
        global.isLoggedIn({ error: 0, message: 'Đăng nhập thành công', userData: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2Nvd…xNTN9.VxS4iA_YPksctx2WlDLefkMPitTN-IaLyiz1B8JmRxA' });

    }


    render() {
        const { isLoggedIn } = this.state
        return (
            // global.isLoggedIn
            <>
                {
                    global.isLoggedIn ?

                        <div className='add-todo'>
                            < div >
                                <label>Email: </label>
                                <input type='text' className='form-control'
                                    value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)} placeholder='Enter your username'></input>
                            </div >
                            <div>
                                <label>Password: </label>
                                <input type='password'
                                    value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)} placeholder='Enter your password'></input>
                            </div>
                            <button onClick={() => this.login()}>Login</button>


                        </div> : <Redirect exact to="/" />
                }

            </>
            //return 
        )
    }
}


export default Login;