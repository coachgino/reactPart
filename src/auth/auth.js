export const signup = (user) => {
    
    return fetch(`${process.env.REACT_APP_API_URL}/signup/` , {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
      }
    ) //end of fetch()
    .then(data=> {
         console.log(data)
         return data.json()
        })
    /*.then (res => {if(res.ok) {
        return res;
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }})*/
    .catch(error=> {console.log("inside catch");console.log(error)})
}
//-------------------------------------------------------------------


export const login = (user) => {
    console.log(JSON.stringify(user))
    return fetch(`${process.env.REACT_APP_API_URL}/signin/`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
     }
    ) //end of fetch
    .then(data => {
        return data.json()
    })
    .catch(err => {
        console.log(err)
    })

} //end of login()
//------ -------------------------------------------------------------
export const authenticate = (data, next) =>
{
if(typeof window !== "undefined")
{
    localStorage.setItem("token", JSON.stringify(data)) //it will have token, user obj returned by nodejs
   // localStorage.setItem("token", JSON.stringify(jwt))

    next()
}
} //end of authenticate()
//-------------------------------------------------------------------


export const isLoggedIn = () => {

    if(typeof window === "undefined")
    return false

    if(localStorage.getItem("token"))
        return JSON.parse(localStorage.getItem("token"))
    else return false
}
//-------------------------------------------------------------------
export const signout = (next) => {
    if(typeof window !== "undefined")
        localStorage.removeItem("token")

    next()

    return fetch(`${process.env.REACT_APP_API_URL}/signout/`, {
        method:"GET"       
     }
    ) //end of fetch
    .then(data => {
        return data.json()
    })
    .catch(err => {
        console.log(err)
    })

}

//-------------------------------------------------------------------
