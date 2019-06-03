const express = require("express");
const router = express.Router();

//@route    GET api/leads
//@desc     Test route
//@access   Public
router.get("/", (req, res) => res.send("Lead route"));

module.exports = router;
