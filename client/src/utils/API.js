import axios from "axios";

export default {
    //User Axios Calls
    createUser: function(userData){
        return axios.post("/api/users/create", userData);
    },
    //user auth
    loginUser: function(loginForm){
        console.log(loginForm)
        return axios.post("/api/users/login", loginForm);
    },
    loginLink: function(userData){
        console.log(userData)
        return axios.post("/api/users/loginLink", userData)
    },
    logOut: function(){
        return axios.post("/api/users/logout")
    },
    isAuthenticated: function(){
        return axios.get("/api/users/status")
    },
    //get users
    getUser: function(){
        return axios.get("/api/users")
    },
    getAllUsers: function(){
        return axios.get("/api/users/all")
    },
    getUsersByName: function(query){
        return axios.get(`/api/users/querybyname/${query}`)
    },
    getUsersByCommittee: function(query){
        return axios.get(`/api/users/querybycommittee/${query}`)
    },
    getUsersBySchool: function(query){
        return axios.get(`/api/users/querybyschool/${query}`)
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
    getCommitteeIds: function(query){
        return axios.get("/api/committees/queried/" +query)
    },
    addCommittee: function(committeeForm){
        return axios.post("/api/committees/add", committeeForm)
    },
    //School Axios Calls
    getSchools: function(){
        return axios.get("/api/schools")
    },
    getSchoolByName: function(name){
        return axios.get("/api/schools/" + name)
    },  
    getSchoolIds: function(query){
        return axios.get("/api/schools/queried/" +query)
    },
    addSchool: function(schoolForm){
        return axios.post("/api/schools/add", schoolForm)
    },
}