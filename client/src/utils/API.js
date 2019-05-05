import axios from "axios";

export default {
    //User Axios Calls
    createUser: function(userData){
        return axios.post("/api/users/create", userData);
    },
    loginUser: function(loginForm){
        console.log(loginForm)
        return axios.post("/api/users/login", loginForm);
    },
    loginLink: function(userData){
        console.log(userData)
        return axios.post("/api/users/loginLink", userData)
    },
    isAuthenticated: function(){
        return axios.get("/api/users/status")
    },
    getUser: function(){
        return axios.get("/api/users")
    },
    loginViaLink: function(token){
        console.log("loggin in with token " + token)
        return axios.get("/api/users/login/" + token, {data:{token: token}})
    },
    updatePW: function(password){
        return axios.put("/api/users/updatepassword", password)
    },
    //Committee Axios Calls
    getCommittees: function(){
        return axios.get("/api/committees")
    },
    getCommitteeByName: function(name){
        return axios.get("/api/committees/" + name)
    },
    //School Axios Calls
    getSchools: function(){
        return axios.get("/api/schools")
    },
    getSchoolByName: function(name){
        return axios.get("/api/schools/" + name)
    }
}