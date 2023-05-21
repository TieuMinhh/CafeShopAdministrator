import React from 'react';
import './ListTodo.scss'
import AddTodo from './AddTodo';
import ListTodoContent from './ListTodoContent'
import { toast } from 'react-toastify'
import { connect } from 'react-redux';

class ListToDo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user: ''

        }

    }
    componentDidMount() {
        let data = localStorage.getItem('user')
        console.log(data);
        { data && console.log('PHong'); }
        this.setState({
            user: data
        })
    }

    state = {
        list: [{ id: 'todo1', title: 'Play video games' },
        { id: 'todo2', title: 'Study' },
        { id: 'todo3', title: 'Surf Facebook' }],
        edit: {}
    }


    addNewTodo = (todo) => {
        this.setState({
            list: [...this.state.list, todo]
        })
        toast.success("Successful!")
    }

    deleteTodo = (todo) => {
        let currentTodo = this.state.list;
        //Tạo ra 1 mảng mới
        currentTodo = currentTodo.filter(
            item => item.id !== todo.id
        )
        this.setState({
            list: currentTodo
        })
        toast.success('Successful delete!')
    }

    editTodo = (todo) => {
        this.setState({
            edit: todo
        })
    }

    listTodo = (listCopy) => {
        this.setState({
            list: listCopy,
            edit: {}
        })
    }

    editChange = (event) => {
        let editCopy = { ...this.state.edit }
        editCopy.title = event.target.value
        this.setState({
            edit: editCopy
        })
    }
    render() {
        let { list, user } = this.state;
        console.log('List to do:', this.props.reduxState);
        let isLoggedIn = this.props.reduxState
        console.log('Tét :', user, 'gà');
        return (
            <>
                {isLoggedIn ? <> <div className="list-todo-container">
                    {/* <AddTodo
                        addNewTodo={this.addNewTodo}
                    />
                    <ListTodoContent list={this.state.list} deleteTodo={this.deleteTodo} editTodo={this.editTodo} edit={this.state.edit}
                        editChange={this.editChange} listTodo={this.listTodo}
                    /> */}
                    Đã đăng nhập thanh cong
                </div></> : <div>Bạn không có quyền truy cập</div>}

            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        reduxState: state.isDangNhap
    }
}

const mapDispatchToProps = () => {

}
export default connect(mapStateToProps)(ListToDo)