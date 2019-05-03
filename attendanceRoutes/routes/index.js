const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");

router.use("/apiRoutes", apiRoutes);
router.use("/htmlRoutes", htmlRoutes);

module.exports = router;