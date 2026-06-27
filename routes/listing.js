const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingContoller=require("../controllers/listings.js");
const multer=require("multer");
const{ storage}=require("../cloudConfig.js");
const upload =multer({storage});

router.
route("/")
.get(wrapAsync(listingContoller.index))
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingContoller.createListing))
router.get("/new", isLoggedIn,listingContoller.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingContoller.showListing))
.put(isLoggedIn, isOwner, upload.single("image"), validateListing, wrapAsync(listingContoller.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingContoller.destroyListing));





// New route




// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingContoller.renderEditForm));


module.exports = router;