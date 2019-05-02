const router = require("express").Router();
const userRoutes = require("./users");

router.use("/users", userRoutes);

module.exports = router;