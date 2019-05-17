const db = require("../../db/models");
const router = require("express").Router();

// /api/contactForm/
router.route("/")
    .post(function (req, res) {
        db.Contact.create(req.body)
            .then(function (formData) {
                res.send(formData)
            })
});

module.exports = router;