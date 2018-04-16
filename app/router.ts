"use strict";

import * as express from "express";
import asyncWrapper from "./lib/asyncwrapper";

import ErrorController from "./controller/errorController";
import IndexController from "./controller/indexController";
import LoginController from "./controller/loginController";
import PricingController from "./controller/pricingController";
import SignupController from "./controller/signupController";

const router = express.Router({caseSensitive: false});

const indexController = new IndexController();
const pricingController = new PricingController();
const loginController = new LoginController();
const signupController = new SignupController();
const errorController = new ErrorController();

router.get("/", asyncWrapper(indexController.get));
router.get("/pricing", asyncWrapper(pricingController.get));
router.get("/login", asyncWrapper(loginController.get));
router.get("/signup", asyncWrapper(signupController.get));

// TestPage
router.get("/e404", asyncWrapper(errorController.get404));
router.get("/e500", asyncWrapper(errorController.get500));

// Fallback 404 Not Found Controller
router.get("*", asyncWrapper(errorController.get404));

export default router;
