import axios from "axios";

export default {
    //User Axios Calls
    createUser: function(userData){
        return axios.post("/api/users/signup", userData);
    },
    loginUser: function(loginForm){
        return axios.post("/api/users/login", loginForm);
    },
    isAuthenticated: function(){
        return axios.get("/api/users/status")
    },
    getUser: function(){
        return axios.get("/api/users")
    },

    //Committee Axios Calls
    getCommitteeByName: function(name){
        return axios.get("/api/committees/" + name)
    },
    //School Axios Calls
    getSchoolByName: function(name){
        return axios.get("/api/schools/" + name)
    }
}