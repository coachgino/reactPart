import {isLoggedIn} from '../auth/auth'
import { Redirect , Link } from 'react-router-dom'
import React, {Component} from 'react'
import {listUsers} from './apiUser'
import DefaultProfileImage from '../images/avatar.png'
class Users extends Component{

    constructor()
    {
        super()
        this.state = {
            users:[],
            redirectIfNotLoggedIn:false
        }
    }

    //this is called when component is mounted.
    componentDidMount()
    {
        const token = isLoggedIn().token
        listUsers(token)
        .then(data => {

            if(data.error)
            {
                console.log(data.error)
                this.setState({redirectIfNotLoggedIn:true})


            }
            else 
            {
                console.log(data)

                this.setState({users: data.userList})
            }
        })
    }

    render()
    {

        const redirectOnError = this.state.redirectIfNotLoggedIn;

        if(redirectOnError || !isLoggedIn())
        {
            return <Redirect to="/signin" />
        }

        return (

            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>

               {this.renderUsers()}

            </div>
        )

    }

renderUsers = () => (
    //its body can have either 1: curly bracket + return keyword
    //or
    //2. round bracket , with no return keyword

    <div className="row">
                
    {this.state.users.map(
        //body of this func can either have a curly brace+ return keyword
        // or
        // plain, brackets , without return k eyword
        (user,i)=> (
               
            <div className="card col-md-3 m-1" key={i}>
            <img class="card-img-top" src={DefaultProfileImage} alt={user.name}
            style={{width:"50%", height:"40%"}}/>

            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link
               to={`user/${user._id}`} className="btn btn-raised btn-sm">View Profile</Link>
           
            </div>
          </div>

                ) //end of body of  callback of map()
    //end of map()            
    )} 

    </div>
)



}

export default Users