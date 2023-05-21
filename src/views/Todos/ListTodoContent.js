import React from 'react'
import { toast } from 'react-toastify'
import './ListTodo.scss'

class ListTodoContent extends React.Component {

    handleDelete = (todo) => {
        this.props.deleteTodo(todo)
    }

    handleEdit = (todo) => {
        let { edit, list } = this.props
        let isEmptyObject = Object.keys(edit).length === 0
        if (isEmptyObject === false && todo.id === edit.id) {

            let listCopy = [...list]
            let objIndex = listCopy.findIndex((item => item.id == todo.id));

            //Update object's name property.
            listCopy[objIndex].title = edit.title
            this.props.listTodo(listCopy)
            toast.success('Update success!')
            return;
        }
        this.props.editTodo(todo)

    }

    handleChangeEdit = (event) => {
        this.props.editChange(event)
    }

    render() {
        let { list, edit } = this.props
        let isEmptyObject = Object.keys(edit).length === 0
        console.log(isEmptyObject);
        return (
            <div className='list-todo-content'>
                {
                    list && list.length > 0 && list.map((item, index) => {
                        return (
                            <div className='todo-child' key={item.id}>
                                {
                                    isEmptyObject === true ? <span>{index + 1} {item.title}</span>
                                        :
                                        <>
                                            {edit.id === item.id ?
                                                <span>{index + 1} - <input value={edit.title}
                                                    onChange={(event) => this.handleChangeEdit(event)}></input></span>
                                                :
                                                <span>{index + 1} - {item.title}</span>}
                                        </>

                                }


                                <button className='edit' onClick={() => this.handleEdit(item)}>{item.id == edit.id && isEmptyObject === false ? 'Save' : 'Edit'}</button>
                                <button className='delete' onClick={() => this.handleDelete(item)}>Delete</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ListTodoContent