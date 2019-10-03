
    export const read = (userId, token) =>
    {
        return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/` , {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization: `Bearer ${token} `
            }
        })
        //the first .then is needed to make the response available
        .then(response => {            
            return response.json() }
            )
        .catch(error => {
            console.log(error)
        }) 
    }


    
    export const updateProfile = (userId, token, updatedUserDetails) =>
    {
       // debugger
        console.log("update profile called")
        for (var temp of updatedUserDetails.values()) {
            console.log(temp); 
         }
         
         
         return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/` , {
            method:"PUT",
            headers:{
                Accept:"application/json",
              //  "Content-Type":"application/json", this is commented bcoz v r also sending photo now
                Authorization: `Bearer ${token} `
            },
            //body: JSON.stringify(updatedUserDetails)
            body:updatedUserDetails
            
        })
        
        //the first .then is needed to make the response available
        .then(response => {  
            console.log("update profile ended")
          
            return response.json() }
            )
        .catch(error => {
            console.log("error in catch")

            console.log(error)
        }) 
    }

    
    export const listUsers = (  token) =>
    {
        return fetch(`${process.env.REACT_APP_API_URL}/users/` , {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization: `Bearer ${token} `
            }
        })
        //the first .then is needed to make the response available
        .then(response => {            
            return response.json() }
            )
        .catch(error => {
            console.log(error)
        }) 
    }

    export const remove = (userId, token) =>
    {
        return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/` , {
            method:"DELETE",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        })
        //the first .then is needed to make the response available
        .then(response => {            
            return response.json() }
            )
        .catch(error => {
            console.log(error)
        }) 
    }


    export const updateUserInLocalStorage = ( newuser, next) =>
    {
        

   if(typeof window !== "undefined")
     if(localStorage.getItem("token"))
        {
            let storedToken = JSON.parse(localStorage.getItem("token"))
            console.log(storedToken.user)

            storedToken.user = newuser;
            console.log("stored token")
            console.log(storedToken.user)

            localStorage.setItem("token",JSON.stringify(storedToken) )        
            next()
        }
 
    }
    