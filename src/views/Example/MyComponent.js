import React from 'react';
import AddComponent from './AddComponent';
import ChildComponent from './ChildComponent';

class MyComponent extends React.Component {

    state = {

        arrJob: [{ id: 'j1', job: 'Front end', salary: 500 },
        { id: 'j2', job: 'Back end', salary: 300 },
        { id: 'j3', job: 'Data engineer', salary: 1000 }
        ]
    }

    addNewJob = (job) => {
        console.log(job);
        this.setState({
            // arrJob: this.state.arrJob.push(job)
            arrJob: [...this.state.arrJob, job]
        })
    }

    deleteAJob = (job) => {
        let currentJob = this.state.arrJob;
        currentJob = currentJob.filter(
            item => item.id !== job.id
        )
        this.setState({
            arrJob: currentJob
        })
        // let newArr = this.state.arrJob.filter((job) =>{
        //     return job
        // })
    }

    render() {
        return (
            //fragment vì nó chỉ trả ra 1 khối nên phải bọc lại
            <>
                <AddComponent
                    addNewJob={this.addNewJob}

                ></AddComponent>

                <ChildComponent arr={this.state.arrJob} deleteAJob={this.deleteAJob} />

            </>
        )
    }
}

export default MyComponent; 