const { Router } = require("express");
const indexController = require("../controllers/indexController");
const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const {isAuth} = require("../lib/authMiddleware");
const passport = require("passport");
const flash = require("connect-flash");

const indexRouter = Router();

indexRouter.use(flash());

const prisma = new PrismaClient();

const signupValidators = [
    body("email").trim().notEmpty().withMessage("Email cannot be empty!").isEmail().withMessage("Email is invalid."),
    body("username").trim().notEmpty().withMessage("Username cannot be empty!").custom(async value => {
        const user = await prisma.user.findUnique({
            where: {
                username: value
            }
        })
    
        if (user) {
            throw new Error("Username already in use.");
        };
    }),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long."),
    body("confirmPassword").custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("Passwords do not match.")
];

const signupErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("signup", {
            errors: errors.array()
        })
    }

    next();
};

indexRouter.get("/", isAuth, indexController.getIndexPage);
indexRouter.get("/sign-up", indexController.getSignupPage);
indexRouter.post("/sign-up", signupValidators, signupErrorHandler, indexController.postSignup);
indexRouter.get("/log-in", indexController.getLoginPage);
indexRouter.post("/log-in", passport.authenticate("local", {failureRedirect: "/log-in", successRedirect: "/", failureFlash: "Invalid username or password."}));
indexRouter.get("/log-out", isAuth, indexController.logout);
indexRouter.get("/back", indexController.getBackPage);


module.exports = indexRouter;