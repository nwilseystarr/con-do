const router = require("express").Router();
const userRoutes = require("./users");
const commmitteeRoutes = require("./committees");
const schoolRoutes = require("./schools");
const attendanceRoutes = require("./attendance");
const eventRoutes = require("./events");

// api routes go here
router.use("/users", userRoutes);
router.use("/committees", commmitteeRoutes);
router.use("/schools", schoolRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/events", eventRoutes);

module.exports = router;