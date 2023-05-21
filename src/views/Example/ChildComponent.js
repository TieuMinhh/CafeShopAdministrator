import React from 'react';
import './Demo.scss'
// class ChildComponent extends React.Component {

//     state = {

//     }


//     render() {
//         console.log(this.props);
//         // let name = this.props.name;
//         // let age = this.props.age;
//         let { name, age, arr } = this.props;// lí do this.props là 1 object và key của nó có tên trùng với biến
//         let a = ''
//         return (
//             //fragment vì nó chỉ trả ra 1 khối nên phải bọc lại
//             <>
//                 <div>
//                     {
//                         a = arr.map((item, index) => {
//                             return (
//                                 <div key={item.id}>
//                                     {item.job} - {item.salary}
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 {console.log('>>>>>>>>Check map:', a)}
//             </>
//         )
//     }
// }

class ChildComponent extends React.Component {
    state = {
        showJobs: false
    }

    handleShowHide = () => {
        this.setState({
            showJobs: !this.state.showJobs
        })
    }

    //Xóa dữ liệu
    handleOnclickDelete = (job) => {
        //alert('Click me')
        console.log('>>> handleOnclickDelete: ', job);
        this.props.deleteAJob(job)
    }

    render() {
        // let name = this.props.name;
        // let age = this.props.age;
        let arr = this.props.arr;
        let { showJobs } = this.state;
        let check = showJobs === false ? 'showJobs: false' : 'showJobs: true'
        console.log(check);
        return (
            <>
                {showJobs === false ? <div><button
                    onClick={() => this.handleShowHide()}
                    className="btn-show">Show</button></div>
                    :
                    <>
                        <div>{
                            arr.map((item, index) => {
                                if (item.salary >= 500) {
                                    return (
                                        <div>
                                            Công việc: {item.job} - Lương: {item.salary} <span onClick={() => this.handleOnclickDelete(item)}>x</span>
                                        </div>
                                    );
                                }
                            })}
                        </div>

                        <div><button onClick={() => this.handleShowHide()}>Hide</button></div>
                    </>
                }
            </>
        )
    }
}
// const ChildComponent =()=>{

// }

export default ChildComponent; 