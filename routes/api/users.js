const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// DB to utilize with this route
const db = require("../../models");

//@route    POST api/users/new
//@desc     New user creation
//@access   Public
router.post(
  "/new/",
  // Validation: add all the fields you want to validate
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Password must contain at least 8 letters/symbols/numbers"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Validates fiels based in the object in the route
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //  Validates email to corroborate duplicate user
      let user = await db.User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Creating object to store in the DB
      user = new db.User({
        name,
        email,
        password
      });

      // Generates 'salt' to harden the password
      const salt = await bcrypt.genSalt(10);

      // Hashing the password to store in the DB
      user.password = await bcrypt.hash(password, salt);

      // Saves user to DB
      await user.save();

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
