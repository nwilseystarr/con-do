import axios from "axios";

export default {
    //User Axios Calls
    createUser: function (userData) {
        return axios.post("/api/users/create", userData);
    },
    //user auth
    loginUser: function (loginForm) {
        console.log(loginForm)
        return axios.post("/api/users/login", loginForm);
    },
    loginLink: function (userData) {
        console.log(userData)
        return axios.post("/api/users/loginLink", userData)
    },
    logOut: function () {
        return axios.post("/api/users/logout")
    },
    isAuthenticated: function () {
        return axios.get("/api/users/status")
    },
    //get users
    getUser: function () {
        return axios.get("/api/users")
    },
    getAllUsers: function () {
        return axios.get("/api/users/all")
    },
    getUsersByName: function (query) {
        return axios.get(`/api/users/querybyname/${query}`)
    },
    getUsersByCommittee: function (query) {
        return axios.get(`/api/users/querybycommittee/${query}`)
    },
    getUsersBySchool: function (query) {
        return axios.get(`/api/users/querybyschool/${query}`)
    },
    getMyDelegates: function(){
        return axios.get(`/api/users/my`)
    },
    loginViaLink: function (token) {
        console.log("loggin in with token " + token)
        return axios.get("/api/users/login/" + token, { data: { token: token } })
    },
    updatePW: function (password) {
        return axios.put("/api/users/updatepassword", password)
    },
    removeUser: function(userId){
        return axios.delete("/api/users/" + userId)
    },
    //Committee Axios Calls
    getCommittees: function () {
        return axios.get("/api/committees")
    },
    getCommitteeByName: function (name) {
        return axios.get("/api/committees/" + name)
    },
    getCommitteeIds: function (query) {
        return axios.get("/api/committees/queried/" + query)
    },
    addCommittee: function (committeeForm) {
        return axios.post("/api/committees/add", committeeForm)
    },
    //School Axios Calls
    getSchools: function () {
        return axios.get("/api/schools")
    },
    getSchoolByName: function (name) {
        return axios.get("/api/schools/" + name)
    },
    getSchoolIds: function (query) {
        return axios.get("/api/schools/queried/" + query)
    },
    addSchool: function (schoolForm) {
        return axios.post("/api/schools/add", schoolForm)
    },
    getAllEvents: function () {
        return axios.get("/api/events")
    },
    getMyEvents: function () {
        return axios.get("/api/events/my")
    },
    getEventById: function (id) {
        return axios.get("/api/events/" + id)
    },
    getEventsByCommitteeId: function(committeeId){
        return axios.get("/api/events/committee/" + committeeId)
    },
    createEvent: function (eventData) {
        return axios.post("/api/events", eventData)
    },
    removeEvent: function(eventId){
        return axios.delete("/api/events/" + eventId)
    },
    checkIn: function (id, attendance) {
        return axios.put("/api/events/" + id, attendance)
    },
    addUserToAttendance: function (id, attendance) {
        return axios.put("/api/events/" + id, attendance)
    },

    //Schedules 
    getScheduleByUser: function (id) {
        return axios.get("api/events/my", id)
    },
    //Measures
    createMeasure: function (measureData){
        return axios.post("/api/measures/", measureData)
    }

}

