import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {isLoggedIn , signout} from '../auth/auth'
const isActiveLink = (history, path) => {

    if( history.location.pathname === path)
        return {color: "#9dc3eb"}
}

const Menu = (props) => (
    <div>
        <ul className="nav nav-tabs justify-content-end bg-dark">
            <li className="nav-item pr-3" >
                <Link
                    className="nav-link" 
                    style={isActiveLink(props.history, "/")}
                    to="/"
                >Home</Link>
            </li>

        
        {
            //if not logged in, show signup,signin menu
            !isLoggedIn() && 
             (
                <>
                <li className="nav-item pr-3">
                    <Link 
                        className="nav-link"
                        style={isActiveLink(props.history, "/signup")}
                        to="/signup"
                    >Sign Up</Link>
                </li>

                <li className="nav-item pr-2">
                    <Link
                        className="nav-link"
                        style={isActiveLink(props.history, "/signin")}
                        to="/signin"
                    >Sign In</Link>
                </li>
                </>                 
             ) 
             // end of conditional check to determine whether or not to display signup,signin
        }

       
        {            //if  logged in, only then show signout menu & User's profile menu

            isLoggedIn() && 
            (
                <>
                
                    <li className="nav-item pr-3" >
                        <Link
                            className="nav-link" 
                            style={isActiveLink(props.history, "/users")}
                            to="/users"
                        >Users</Link>
                    </li>
                    <li className="nav-item pr-0">
                                <span
                                    
                                    onClick={
                                        ()=> 
                                            {
                                                signout( 
                                                    //after signout() finishes, it will execute this callback function, which will redirect user to "/" after signout
                                                    ( )=>  props.history.push("/")
                                                )
                                            }
                                        }
                                    className="nav-link"
                                    // style={isActiveLink(props.history, "/signin")}
                                    style={{cursor:"pointer",
                                    color:"#e69583"}}
                                    
                                >Sign Out</span>
                            </li>

                            <li className="nav-item pr-2">
                                <Link
                                    to={`/user/${isLoggedIn().user._id}`}
                                >  
                                <span
                                    className="nav-link"
                                     style={isActiveLink(props.history, 
                                        `/user/${isLoggedIn().user._id}`)}
                                  //  style={{cursor:"pointer"}}                                    
                                >
                                
                                {`${isLoggedIn().user.name}'s profile `}
                                </span>
                                </Link>

                            </li>
                </>
            )
        // end of conditional check to determine whether or not to display signout menu
        }

        

        </ul>
    </div>
)




export default withRouter(Menu)

