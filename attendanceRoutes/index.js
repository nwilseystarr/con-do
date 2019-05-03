const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./routes");


// API Routes
router.use("/api", apiRoutes);

module.exports = router;