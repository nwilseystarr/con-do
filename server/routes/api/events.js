const { Events, User } = require("../../db/models");
const router = require("express").Router();

// /api/events/committee/:committeeId
router.route("/committee/:committeeId")
    //get all events for a committee and all events from the all committee
    .get(function (req, res) {
        Events.findAll({
            where: {
                committeeId: [req.params.committeeId, 1000]
            }
        })
            .then(function (events) {
                res.send(events)
            })
    })

// /api/events/
router.route("/")
    //get all events
    .get(function (req, res) {
        Events.findAll()
            .then(function (eventsData) {
                res.send(eventsData)
            })
    })
    // if the user is an admin they can create an event
    .post(function (req, res) {
        if (req.user.userType === "admin") {
            Events.create(req.body)
                .then(function (createdEvent) {
                    // console.log(createdEvent)
                    res.send(createdEvent)
                })
        }
    })
// /api/events/my
router.route("/my")
    //get events for logged in user
    .get(function (req, res) {
        //if the user is an admin or an advisor they will be sent all events
        if (req.user.userType === "admin" || req.user.userType === "advisor") {
            Events.findAll()
                .then(function (eventData) {
                    res.send(eventData)
                })
        }
        else {
            //else return the user all events for their committee and all events from the all committee
            Events.findAll({
                where: {
                    committeeId: [req.user.committeeId, 1000]
                }
            })
                .then(function (eventData) {
                    res.send(eventData)
                })
        }
    })
// /api/events/:id
router.route("/:id")
    .get(function (req, res) {
        //find an event with a matching id
        Events.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function (eventData) {
                res.send(eventData)
            })
    })
    .put(function (req, res) {
        if (req.user.userType === "admin" || req.user.userType === "staff" || req.user.userType === "advisor") {
            //if the user is admin or staff, they can update event values. This route is most used for
            //checking in users to an event and adding them to the attendance list when their account is created
            Events.update(
                req.body,
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
                .then(eventData => {
                    res.send(eventData)
                })
        }
    })
    //if the user is an admin they can delete events
    .delete(function (req, res) {
        if (req.user.userType === "admin") {
            Events.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(deleted => {
                    res.end()
                })
        }
    })

module.exports = router;