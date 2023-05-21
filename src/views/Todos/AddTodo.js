import React from 'react'
import { toast } from 'react-toastify'
import './ListTodo.scss'
class AddTodo extends React.Component {

    state = {
        title: ''
    }

    handleOnChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleAddTodo = () => {
        let { title } = this.state
        if (!title) {
            toast.error('Missing title')
            return
        }
        let todo = {
            id: Math.floor(Math.random() * 101),
            title: title
        }

        this.props.addNewTodo(todo)
        this.setState({
            title: ''
        })
    }

    render() {

        return (
            <div className='add-todo'>
                <input type='text' value={this.state.title} onChange={(event) => this.handleOnChangeTitle(event)}></input>
                <button className='add' onClick={() => this.handleAddTodo()} >Add</button>
            </div>
        )
    }
}

export default AddTodo;