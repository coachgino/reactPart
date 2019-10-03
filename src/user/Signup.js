import React, {Component} from 'react'
import {signup} from '../auth/auth'
import {LoaderComponent} from '../core/Loading'


class Signup extends Component{

    constructor()
    {
        super()
        this.state = {
            name:"",
            email:"",
            password:"",
            error:"",
            signupDone:false,
            successDisplayName:"",
            loading: false
        }
    }

    
    render()
    {

        return (

            <div className="container">
                <h2 className="mt-5 mb-5">Sign up</h2>

                <div className="alert alert-danger" style={{
                        display: this.state.error ? "":"none"  }}>   
                    {this.state.error}
                </div>   
    
                <div className="alert alert-success " style={{
                        display: this.state.signupDone ? "":"none"  }}>   
                      Hi {this.state.successDisplayName},U have successfully registered. Please login.
               
                </div> 

                {this.state.loading?
                     <div className="alert-secondary  text-center">
                        <h2>Processing...</h2>   
                        <LoaderComponent />  
                     </div>
                     :
                     ""
                }

                {this.signupForm()}
            </div>
        );
    }
//-------------------------------------------------------------------
  
signupForm = () => {
    return (
   <form>
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
      value={this.state.password}
       />
   </div>

   <button  id="signupSubmit" disabled={!this.state.email || !this.state.name || !this.state.password} className=" signupSubmit1 btn btn-primary btn-raised" 
   onClick= {this.clickSubmit} 
   >Submit</button>
</form>    
    )
}
//-------------------------------------------------------------------
    handleChange = (inputData) => (event) =>
    {
        //get rid of red error messages OR green success message, if user starts typing in form again..
        //by using below 2 statements
        this.setState({error:""})
        this.setState({signupDone:false})

        //as user types in form, set value of field to what he typed...in state
        this.setState({ [inputData]: event.target.value })

    }
//-------------------------------------------------------------------
    clickSubmit = (event) => {
        console.log("inside clickSubmit()")
       event.preventDefault()

       this.setState({loading:true})

        //create new user object,and fill it with user details from state
        const user = {
            name:this.state.name,
            email:this.state.email, 
            password: this.state.password
        }

        //console.log(user)
        signup(user)
        .then(data => {
           // console.log("data has ")
            console.log(data)
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
                
                this.setState({
                    successDisplayName:this.state.name,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    signupDone:true, loading:false
                })

            }
        }) //end of then block

      
    }

}

export default Signup