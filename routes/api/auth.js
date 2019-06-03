const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

const db = require("../../models");
//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    // Await is user because we're using async
    // select("-password") tells the program to return everything but the password
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Authenticate user and get token
//@access   Public
router.post(
  "/",
  // Validation: add all the fields you want to validate
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Validates fiels based in the object in the route
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //  Validates email to corroborate duplicate user
      let user = await db.User.findOne({ email });

      // If used does not exist returns error
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Validates if password matches with the one in the DB
      const isMatch = await bcrypt.compare(password, user.password);

      // If password does not match returns error
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Creates payload for JWT
      const payload = {
        user: { id: user.id, role: user.role }
      };

      // Sign Token
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // Expiration time in seconds
        { expiresIn: 360000 },
        // Validation of token
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // Any other error in mongo/mongoose is going to report this error
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
