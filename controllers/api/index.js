const router = require("express").Router();
const ThoughtRouter = require("./thoughts-routes");
const userRoutes = require("./user-routes");

router.use("/users", userRoutes);
router.use("/thoughts", ThoughtRouter);

module.exports = router;
