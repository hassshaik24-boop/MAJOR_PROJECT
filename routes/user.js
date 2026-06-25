const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
router.route("/signup")
.get( userController.renderSignUpForm)
.post( wrapAsync(userController.signup));


router.route("/login")
.get((req, res) => {
    res.render("users/login.ejs");
})
.post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    async (req, res) => {
        req.flash("success", "Welcome to Roomly");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    }
);





router.get("/logout", (req, res, next) => { 
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are now logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;