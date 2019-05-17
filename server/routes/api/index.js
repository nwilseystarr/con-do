const router = require("express").Router();
const userRoutes = require("./users");
const commmitteeRoutes = require("./committees");
const schoolRoutes = require("./schools");
const eventRoutes = require("./events");
const measureRoutes = require("./measures");
const chatRoutes = require("./chat");
const contactForm = require("./contactForm");

// api routes go here
router.use("/users", userRoutes);
router.use("/committees", commmitteeRoutes);
router.use("/schools", schoolRoutes);
router.use("/events", eventRoutes);
router.use("/measures", measureRoutes);
router.use("/chat", chatRoutes);
router.use("/contactForm", contactForm);

module.exports = router;