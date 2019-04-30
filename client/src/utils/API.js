import axios from "axios";

export default {
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
    }
}