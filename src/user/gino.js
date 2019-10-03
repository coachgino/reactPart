handleChange = (inputData) => (event) =>
{
    this.setState({error:""})
    const value = inputData === "photo" ? event.target.files[0] : event.target.value
    const photoSize =  inputData === "photo" ? event.target.files[0].size : 0
    
    this.setState({fileSizeLimit: photoSize})
    this.setState({ [inputData]: value })
    console.log("setting form data")
    console.log(value)
    
    this.userData.set(inputData , value) //setting formData
   

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

  
    const userIdFromUrl = `${this.props.match.params.userId}`
    const token = isLoggedIn().token


   updateProfile(userIdFromUrl,token,this.userData)
   
   .then(data => {
        if(data.error)
        {
           console.log(data.error)
            this.setState({error:data.error , loading:false})
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
else{`
    console.log("form valid not successful")

    this.setState({loading:false})
}
  
}



