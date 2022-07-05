const router = require("express").Router();
const userController = require('../Controllers/userController');
const { CODE, MESSAGE } = require('../../services/http/http_status');
const { body, validationResult, check } = require("express-validator");
const bcrypt = require('bcryptjs');
const {
    createToken,
    createEmailToken,
    verifyToken,
  } = require("../../services/jwt/auth_middleware");

// Sign up user
router.post("/signup",
    // Check if email exist
    userController.findByEmail,
    userController.signup);

// Get a user by ID
router.get("/:user_id", userController.findUserById);

// Update User By ID

router.put("/update/:user_id", userController.updateUser);

router.post("/login",
[
    body("email").notEmpty().trim().isEmail(),
    check("password").not().isEmpty().trim().escape()
  ],
userController.login,
async (req, res, next)=>{
    let comparepwd = null;
    comparepwd =  await bcrypt.compare(req.body.password, req.email.password);
    console.log(comparepwd);
    if (!comparepwd) {
        res.status(CODE.UNPROCESSABLE).json({
          code: CODE.UNPROCESSABLE,
          message: "Password is incorrect",
        });
      } else {
        /* pass to next middleware for token creation */
        next();
      }
   
},
async (req, res, next) => {
    let token = null;
    try {
      token = await createToken(req.email.user_id);
      /*send success response with token*/
      res.status(CODE.SUCCESS).json({
        code: CODE.SUCCESS,
        message: "You are now logged in",
        token: token,
        user_id: req.email.user_id,
      });
    } catch (e) {
      res.status(CODE.UNPROCESSABLE).json({
        code: CODE.UNPROCESSABLE,
        message: e,
      });
    }
  }

  
)


module.exports = router;