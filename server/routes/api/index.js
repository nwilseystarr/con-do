const router = require("express").Router();
const userRoutes = require("./users");
const commmitteeRoutes = require("./committees");
const schoolRoutes = require("./schools");
const eventRoutes = require("./events");
const measureRoutes = require("./measures")

// api routes go here
router.use("/users", userRoutes);
router.use("/committees", commmitteeRoutes);
router.use("/schools", schoolRoutes);
router.use("/events", eventRoutes);
router.use("/measures", measureRoutes)

module.exports = router;