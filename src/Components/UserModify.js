import React, { Component } from 'react';
import uuid from 'uuid'
import Axios from 'axios';

class UserModify extends Component {
    state = {}
    saveUserInfo = () => {
        if (this.props.data.id === '') {
            this.inserUserData();
        } else {
            this.updateUserData();
        }
    }
    updateUserData = () => {
        const url = `https://reqres.in/api/users/${this.props.data.id}`;
        let user = {};
        user.name = this.refs.name.value;
        user.job = this.refs.job.value;
        user.id = this.props.data.id;
        Axios.put(url, user)
            .then(response => {
                const data = response.data;
                if (data.updatedAt) {
                    this.props.saveUser(user);
                }
            })
    }
    inserUserData = () => {
        const url = `https://reqres.in/api/users`;
        let user = {};
        user.name = this.refs.name.value;
        user.job = this.refs.job.value;
        user.id = this.props.data.id;
        fetch(url, { method: 'post', body: JSON.stringify(user) })
            .then(response => response.json())
            .then(data => {
                if (data.createdAt) {
                    this.refs.name.value = ''
                    this.refs.job.value = ''
                    this.refs.name.focus();

                    let item = {
                        first_name: user.name, last_name: user.job, email: 'test@gmail.com',
                        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg', id: uuid()
                    }
                    this.props.addNewUser(item);
                }
            })
    }
    render() {
        const user = this.props.data;
        return (
            <div className='card inp-margin'>
                <div className='card-header'>
                    {user.first_name + ' ' + user.last_name}
                </div>
                <div className='card-body'>
                    <div >
                        <label>Name:</label>
                        <input className="form-control " placeholder="Enter name" ref='name' defaultValue={this.props.data.first_name} />
                        <label>Job:</label>
                        <input className="form-control" placeholder="job" ref='job' defaultValue={this.props.data.last_name} />
                    </div>
                </div>
                <div className='card-footer'>
                    <div className='btn-group btn-group-sm'>
                        <div className='btn btn-success' onClick={this.saveUserInfo}>Save</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserModify;