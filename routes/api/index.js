const router = require("express").Router();

// Import routes files
const authRoutes = require("./auth");
const profileRoutes = require("./profile");
const usersRoutes = require("./users");
const leadsRoutes = require("./lead");

// API routes
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/users", usersRoutes);
router.use("/leads", leadsRoutes);

module.exports = router;
