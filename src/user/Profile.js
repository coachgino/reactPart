import DefaultProfileImage from '../images/avatar.png'

import React, {Component} from 'react'
import {isLoggedIn} from '../auth/auth'
import { Redirect , Link } from 'react-router-dom'
import {read} from './apiUser'
import DeleteUser from './DeleteUser'

class Profile extends Component{

    constructor()
    {
        super()
        this.state = {
            user:"",
            redirectIfNotLoggedIn:false
        }
    }

    componentDidMount()
    {
        console.log("userId from url is ")
        console.log(`${this.props.match.params.userId}`)

        const userIdFromUrl = `${this.props.match.params.userId}`
        this.init(userIdFromUrl)
        
            //console.log(data.json())

           
       
    } //end of componentDidMount()

    componentWillReceiveProps(props)
    {
        const userId= props.match.params.userId
        this.init(userId)
    }

    init = (userId)=> {

        const token = isLoggedIn().token
        read(userId , token)

        //the second .then is our main business logic
        .then ( data => {

            if(data.error)
            {
                this.setState({redirectIfNotLoggedIn:true})
            }
            else {
                console.log(data)
                this.setState({user:data}) 
            }           

        }) 
        
        
    } //end of init()


    render()
    {

        const redirectOnError = this.state.redirectIfNotLoggedIn;

        if(redirectOnError || !isLoggedIn())
        {
            return <Redirect to="/signin" />
        }
        

        return(
        <div className="container">
                        <h2 className="mt-5 ml-4">Profile</h2>


<div className="row">
                <div className="col-md-6">
              
                        <img src={DefaultProfileImage} style={{width:"50%", height:"70%"}}/>
                       
                 
                </div>
                
                
               
                <div className="col-md-6">   
               
                <div className="lead "> 
                {/* this div is to display users details */}
                <p>Name: {`${this.state.user.name}`}</p>
                        <p>Email: {`${this.state.user.email}`}</p>
                        <p>
                            {
                                `Joined on: ${new Date(this.state.user.created).toDateString()}`
                            }
                        </p>     
                            
                </div>    

     
{

    isLoggedIn().user && isLoggedIn().user._id === this.state.user._id && 
    (
        <div className="d-inline-block ">
            <Link 
                className="btn btn-raised btn-secondary mr-3"
                to={`/user/edit/${this.state.user._id}`}
            >
                Edit Profile
            </Link>

            <DeleteUser userId={this.state.user._id}/>

           

    
        </div>
             ) }    
                               </div>

             </div>
            
        </div>
            


        )
    }
}
export default Profile