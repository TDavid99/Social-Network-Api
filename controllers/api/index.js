const router = require("express").Router();
const userRoutes = require("./user-routes");

const ThoughtRouter = require("./thoughts-routes");

router.use("/users", userRoutes);
router.use("/thoughts", ThoughtRouter);

module.exports = router;
