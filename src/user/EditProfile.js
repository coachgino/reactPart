import React, {Component} from 'react'
import {isLoggedIn} from '../auth/auth'
import {read, updateProfile, updateUserInLocalStorage} from './apiUser'
import { Redirect } from 'react-router-dom'
import {LoaderComponent} from '../core/Loading'

class EditProfile extends Component {

    constructor()
    {
        super()
        this.state = {
            id:"",
            name:"",
            email:"",
            password:"",
            redirectToProfilePage:false,
         //   redirectUnauthUser:false,
            error:"",
            loading:false,
            fileSizeLimit:0
        }
    }


    render()
    {

        if(!isLoggedIn())
        {
            return <Redirect to="/signin" />
        }

        if(!this.isActionAllowedCheckerForLoggedInUsers())
        {
            return <Redirect to="/" />
        }

     //   if(this.state.redirectUnauthUser)
       // return <Redirect to={`/`} />


        if(this.state.redirectToProfilePage)
        {
            //after user finishes updating details, this variable in state is set to true
            return <Redirect to={`/user/${this.state.id}`} />

        }
     
        return (    

            <div className="container">
            <h2 className="mt-5">Edit Profile</h2>
            <br/>

            <div className="alert alert-danger" style={{
                        display: this.state.error ? "":"none"  }}>   
                    {this.state.error}
            </div>   

            {this.state.loading?
                     <div className="alert-secondary  text-center">
                        <h2>Updating...</h2>   
                        <LoaderComponent />  
                     </div>
                     :
                     ""
                }
            
                {this.signupForm()}

            </div>
          )}

          isActionAllowedCheckerForLoggedInUsers = () => {
            //  this method is not for guest users but for logged in users.
            // to provide further restriction, to prevent 1 logged in user from changing other logged in user's data
            
            const userId= this.props.match.params.userId
            
                if(isLoggedIn().user)
                    {
                        if(isLoggedIn().user._id !== userId)
                        return false
            
                    }
                return true
               
            }

    signupForm = () => {
        return (
       <form>
       <div className="form-group">
           <label className="text-muted">Profile Photo</label>
           <input 
           type="file"
           accept="image/*"
           className="form-control" 
           onChange={this.handleChange("photo")} 
           //here "name" passed to handleChange() is the variable name present in this.state
           />
       </div>

       <div className="form-group">
           <label className="text-muted">Name</label>
           <input type="text" className="form-control" onChange={this.handleChange("name")} 
           //here "name" passed to handleChange() is the variable name present in this.state
           value={this.state.name}                            
           />
       </div>
    
       <div className="form-group">
           <label className="text-muted">Email</label>
           <input type="email" className="form-control" onChange={this.handleChange("email")} 
           value={this.state.email}
           />
       </div>
    
       <div className="form-group">
           <label className="text-muted">Password</label>
           <input type="password" className="form-control" 
          onChange={this.handleChange("password")} 
          placeholder="Type here if you want to set new password"
          value={this.state.password}
           />
       </div>
    
       <button  id="signupSubmit"  className=" signupSubmit1 btn btn-primary btn-raised" 
       onClick= {this.clickSubmit} 
       >Update</button>
    </form>    
        )
    }

    handleChange = (inputData) => (event) =>
    {
        this.setState({error:""})

        //get rid of red error messages OR green success message, if user starts typing in form again..
        //by using below 2 statements
    

        //as user types in form, set value of field to what he typed...in state
        const value = inputData === "photo" ? event.target.files[0] : event.target.value
        const photoSize =  inputData === "photo" ? event.target.files[0].size : 0
        this.setState({fileSizeLimit: photoSize})
        this.setState({ [inputData]: value })
        console.log("setting form data")
        console.log(value)
        this.userData.set(inputData , value)
        for (var temp of this.userData.values()) {
            console.log(temp); 
         }

    }

    
    isFormValid = () =>
    {
        console.log(this.userData.toString())
        if(this.state.fileSizeLimit > 100000)
        {
            this.setState({error:"Error:Photo size must be < 100kb"})
            return false;
        }

        if(this.state.name.length < 3 || this.state.name.length > 30)
        {
            this.setState({error:"Error:Name must be between 3-30 chars"})
            return false;
        }
        if(this.state.password.length > 0 && (this.state.password.length < 5 || this.state.password.length > 20))
        {
            this.setState({error:"Error:Password must be between 5-20 chars"})
            return false;
        }

         // email@domain.com
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))) {
        this.setState({
          error: "Error: Email format should be email@domain.com",
        });
        return false;
      }

        return true;
}

    clickSubmit = (event) => {
        console.log("inside clickSubmit()")
       event.preventDefault()
     //   debugger;
       this.setState({loading:true})

       for (var temp of this.userData.values()) {
        console.log(temp); 
     }

       if(this.isFormValid()){
           console.log("form valid - successful")
       //this.setState({loading:true})

        //create new user object,and fill it with user details from state
       /*  const user = {
            name:this.state.name,
            email:this.state.email, 
            password: this.state.password || undefined
            //undefined to respect the password required rule in user model
            //bcoz if password is not updated by user, then it remains blank and a user with blank password cannot be saved in db. But if the field has a value of undefined, then the user is stored in db but that undefined field is not stored. So the existing value of password for this user remains as is , in the db.
        } */
        const userIdFromUrl = `${this.props.match.params.userId}`
        const token = isLoggedIn().token


//        updateProfile(userIdFromUrl,token,user)
        updateProfile(userIdFromUrl,token,this.userData)
        .then(data => {
           // console.log("data has ")
            console.log(userIdFromUrl+ " hahahah")
            if(data.error)
            {
               console.log("agaya error")
               console.log(data.error)
                this.setState({error:data.error , loading:false})
               // console.log("value of error variable in state is ")
               // console.log(this.state.error)
            }
            else
            {
                console.log("no error")
                console.log(data)
                updateUserInLocalStorage(data.user, 
                    () => {
                        this.setState({redirectToProfilePage:true})
                    })
                


            }
        }) //end of then block
        .catch(err=>
        {
            console.log(err)
        })
        
    }
    else{
        console.log("form valid - nt successful")

        this.setState({loading:false})
    }
      
    }
    
 
          componentDidMount()
          {        
              this.userData = new FormData()   
              console.log("edit profile ka cdm called ")

              console.log("userId from url is ")
              console.log(`${this.props.match.params.userId}`)
      
              const userIdFromUrl = `${this.props.match.params.userId}`
              this.init(userIdFromUrl)
              console.log("end of init")

              
   
           //return <Redirect to={`/user/${isLoggedIn().user._id }`} />
       }

              
                  //console.log(data.json())
      
                 
             

          init = (userId)=> {

            const token = isLoggedIn().token
            read(userId , token)
    
            //the second .then is our main business logic
            .then ( data => {
    
                if(data.error)
                {
                    console.log("error in init")
                    this.setState({redirectIfNotLoggedIn:true})
                }
                else {
                    console.log(data)
                    this.setState({id:data._id, name:data.name, email:data.email}) ;   console.log(this.state.id+" aur bhai")

                 /*    if( isLoggedIn().user._id !== this.state.id)
                    {
                        console.log("hi")
                        console.log(isLoggedIn().user.name + " "+isLoggedIn().user._id )
                        console.log(this.state.name+ " "+this.state.id)
                        console.log(isLoggedIn().user._id !== this.state.id )
                        console.log("hi2")

                        this.setState({redirectUnauthUser:true})
                    } */
                }    
                
    
            }) 
            
            
        } //end of init()


    }
export default EditProfile