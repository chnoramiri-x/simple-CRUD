import React, { Component } from 'react';

class Userinfo extends Component {
    render() {
        const user = this.props.data;
        return (
            <div>
                <div className='card'>
                    <div className='card-header'>
                        {user.first_name + ' ' + user.last_name}
                    </div>
                    <div className='card-body'>
                        <img src={user.avatar} />
                        <p>{user.email}</p>
                    </div>
                    <div className='card-footer'>
                        <div className='btn-group btn-group-sm'>
                            <div className='btn btn-primary' onClick={() => this.props.modify(user.id)} >Edit</div>
                            <div className='btn btn-danger'
                                onClick={() => this.props.remove(user.id)}>Remove</div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default Userinfo;