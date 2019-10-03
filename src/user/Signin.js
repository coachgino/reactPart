
import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {login, authenticate} from '../auth/auth'
import {LoaderComponent} from '../core/Loading'




class Signin extends Component{

    componentDidMount() {
        console.log("signin started")
        console.log(`${process.env.REACT_APP_API_URL}`);
    }

    constructor()
    {
        super()
        this.state = {
            progress:0,
            email:"",
            password:"",
            error:"",
            redirectFlag:false, //set to true after login is success
            loading: false
        }
    } //end of constructor
//-------------------------------------------------------------------
    render()
    {

        if(this.state.redirectFlag)
        {
            return <Redirect to="/" />
        }

        return(

            <div className="container">

                <h2 className="mt-5 mb-5">Signin</h2>

                <div className="alert alert-danger"
                style={{display: this.state.error ? "":"none"}}
                >
                    
                    {this.state.error}
                    
                </div>


                {this.state.loading?
                     <div className="alert-secondary  text-center">
                        <h3>Verifying...</h3>    
                         <LoaderComponent />
                    </div>
                     :
                     ""
                }

                {this.signinForm()}

            </div>


        )
    } //end of render()
//-------------------------------------------------------------------
    signinForm = () => {
        return (

            <form>


                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" className="form-control" 
                    onChange={this.handleChange("email")} 
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

                <button 
                disabled={!this.state.email || !this.state.password}
                className=" btn btn-primary btn-raised loginSubmit2" 
                id="loginSubmit"
                onClick= {this.clickSubmit} 
                >Submit</button>
            
            </form>
            

        )
    } //end of signinForm()
//-------------------------------------------------------------------
    handleChange = (inputData) => (event) => {
        this.setState({error:""})
        this.setState({ [inputData]: event.target.value })

    } //end of handleChange()
//-------------------------------------------------------------------
    clickSubmit = (event) => {
        
        event.preventDefault()
        this.setState({loading:true})
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(user)

        login(user)
        .then(data => {

            console.log("hi gino")
            console.log(data)
            console.log(`${process.env.REACT_APP_API_URL}/signin/`)
            if(data.error)
            {
                console.log("error")
                console.log(data)
                this.setState({error:data.error ,loading:false})

            }
            else
            {
                console.log("no error")
                console.log(data.token)
                authenticate(data, ()=> {
                    this.setState({redirectFlag:true , loading:false})
                }) //end of authenticate method's call

            } //end of else

        }) //end of then promise

    } //end of clickSubmit()

} //end of class

export default Signin