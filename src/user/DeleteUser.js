import React, {Component} from 'react'

import {remove} from './apiUser'
import {isLoggedIn,signout} from '../auth/auth'
import { Redirect  } from 'react-router-dom'


class DeleteUser extends Component {

  state = {
    redirect:false
  }

    render()
    {

      if(this.state.redirect)
      {
        return <Redirect to="/" />
      }
        return (      
<div>
          <button className="btn btn-raised btn-danger" data-toggle="modal" onClick={this.deleteDialog} data-target="#exampleModal" >
        
    
          Delete Profile
          </button>
        <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteConfirm}data-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
        </div>
  

     

        )}

        deleteConfirm = () =>
{
    console.log("delete")
    console.log(this.props.userId)
    console.log(isLoggedIn().token)
    remove(this.props.userId, isLoggedIn().token)
    .then(data => {

      if(data.error)
        {
            console.log(data.error)
        }
        else{
          signout( () => console.log("user deleted"))
          this.setState({redirect:true})

        }
    })


}

}

export default DeleteUser