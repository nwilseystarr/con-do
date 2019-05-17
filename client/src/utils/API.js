import axios from "axios";

export default {
    //User Axios Calls
        // Create
        createUser: function (userData) {
            return axios.post("/api/users/create", userData)
        },
        //Read
        //Get the logged in user
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
        getMyDelegates: function () {
            return axios.get(`/api/users/my`)
        },
        //Update
        updatePW: function (password) {
            return axios.put("/api/users/updatepassword", password)
        },
        //Delete
        removeUser: function (userId) {
            return axios.delete("/api/users/" + userId)
        },
        //user auth
        loginUser: function (loginForm) {
            // console.log(loginForm)
            return axios.post("/api/users/login", loginForm)
        },
        loginLink: function (userData) {
            // console.log(userData)
            return axios.post("/api/users/loginLink", userData)
        },
        logOut: function () {
            return axios.post("/api/users/logout")
        },
        isAuthenticated: function () {
            return axios.get("/api/users/status")
        },
        loginViaLink: function (token) {
            // console.log("loggin in with token " + token)
            return axios.get("/api/users/login/" + token, { data: { token: token } })
        },

    //Committee Axios Calls
        //Create
        addCommittee: function (committeeForm) {
            return axios.post("/api/committees/add", committeeForm)
        },
        //Read
        getCommittees: function () {
            return axios.get("/api/committees")
        },
        getCommitteById: function (committeeId) {
            return axios.get("/api/committees/" + committeeId)
        },
        getCommitteeIds: function (query) {
            return axios.get("/api/committees/queried/" + query)
        },

    //School Axios Calls
        //Create
        addSchool: function (schoolForm) {
            return axios.post("/api/schools/add", schoolForm)
        },
        //Read
        getSchools: function () {
            return axios.get("/api/schools")
        },
        getSchoolByName: function (name) {
            return axios.get("/api/schools/" + name)
        },
        getSchoolIds: function (query) {
            return axios.get("/api/schools/queried/" + query)
        },
    //Event Axios Calls
        //Create
        createEvent: function (eventData) {
            return axios.post("/api/events", eventData)
        },
        //Read
        getAllEvents: function () {
            return axios.get("/api/events")
        },
        getMyEvents: function () {
            return axios.get("/api/events/my")
        },
        getEventById: function (id) {
            return axios.get("/api/events/" + id)
        },
        getEventsByCommitteeId: function (committeeId) {
            return axios.get("/api/events/committee/" + committeeId)
        },
        //Update
        checkIn: function (id, attendance) {
            return axios.put("/api/events/" + id, attendance)
        },
        addUserToAttendance: function (id, attendance) {
            return axios.put("/api/events/" + id, attendance)
        },
        //Delete
        removeEvent: function (eventId) {
            return axios.delete("/api/events/" + eventId)
        },


    //Schedules Axios Calls
        getScheduleByUser: function (id) {
            return axios.get("api/events/my", id)
        },
    //Measures Axios Calls
        //Create
        createMeasure: function (measureData) {
            return axios.post("/api/measures/", measureData)
        },
        //Read
        getMeasuresByEvent: function (eventId) {
            return axios.get("/api/measures/event/" + eventId)
        },
        getMeasureById: function (measureId) {
            return axios.get("/api/measures/" + measureId)
        },
        //update
        updateMeasure: function (measureId, measureBody) {
            return axios.put("/api/measures/" + measureId, measureBody)
        },

    //Chat Axios Calls
        getMessage: function (message) {
            return axios.get("/api/chat/", message)
        },
        postMessage: function (message) {
            return axios.post("/api/chat/", message)
        },

    //Contact Form Axios Calls
        postContactForm: function (name, email, subject, message) {
            return axios.post("/api/contactForm/", name, email, subject, message)
        },
}

