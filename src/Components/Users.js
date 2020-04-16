import React, { Component } from 'react';
import './Users.css'
import UserInfo from './UserInfo'
import Pagination from './Tools/Pagination';
import UserModify from './UserModify';
import Axios from 'axios';


class Users extends Component {
    localStorageKey = 'users-key';
    state = {
        users: [],
        isLoading: true,
        currentpPage: 1,
        totalPage: 1
    }

    componentWillMount() {
        if (localStorage.getItem(this.localStorageKey)) {
            const items = JSON.parse(localStorage.getItem(this.localStorageKey))
            this.setState({ users: items })
        }
        this.getUsers();
    }

    tempUser = { first_name: '', last_name: '', email: '', avatar: '', id: '' }
    componentDidMount() {
        (this.getUsers())
    }
    getUsers = (page = 1) => {
        const url = `https://reqres.in/api/users?page=${page}`;
        Axios.get(url)
            .then(response => {
                const result = response.data;
                this.setState({
                    users: result.data,
                    isLoading: false, currentpPage: result.page,
                    totalPage: result.total_pages
                })
            })
            .catch(error => console.log(error()))
    }
    removeUsers = (id) => {
        if (!window.confirm("are you sure?"))
            return;
        const url = `https://reqres.in/api/users${id}`
        fetch(url, { method: 'delete' })
            .then(response => {
                if (response.status === 204) {
                    this.setState({ users: this.state.users.filter(q => q.id !== id) })
                }
            })
    }
    editMode = (id, isEdit = true) => {
        let index = this.state.users.findIndex(q => q.id === id);
        let temp = this.state.users;
        temp[index].editMode = isEdit;
        this.setState({ users: temp })

    }
    refreshUserData = (user) => {
        let index = this.state.users.findIndex(q => q.id === user.id);
        let temp = this.state.users;
        temp[index].editMode = false;
        temp[index].first_name = user.name;
        temp[index].last_name = user.job;
        this.setState({ users: temp })
    }

    addNewUser = (user) => {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.users.concat(user)))
        this.setState({ users: this.state.users.concat(user) })
    }
    render() {
        return (
            <div className='row row-User'>
                {this.state.users.map((item, i) => {
                    return (<div className='col-md-4'>
                        {item.editMode ?
                            <UserModify saveUser={this.refreshUserData} cancelEditMode={this.editMode} data={item} key={i} />
                            :
                            <UserInfo modify={this.editMode} remove={this.removeUsers} data={item} key={i} />
                        }
                    </div>
                    )
                })}
                <div className='col-md-4 '>
                    <UserModify addNewUser={this.addNewUser} cancelEditMode={this.editMode} data={this.tempUser} />
                </div>

                <div className='row'>
                    <div className='col m-4'>
                        <Pagination goToPage={this.getUsers} totalPage={this.state.totalPage} currentpPage={this.state.currentpPage} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Users;
