const db = require("../../db/models");
const router = require("express").Router();

// /api/chat/
router.route("/")
    .get(function (req, res) {
        db.Chat.findAll({})
            .then(messageData => {
                res.send(messageData)
            })
    })
    .post(function (req, res) {
        db.Chat.create(req.body)
            .then((messageData, err) => {
                    if (err)
                        sendStatus(500);
                    res.sendStatus(200);
                })
    });

module.exports = router;