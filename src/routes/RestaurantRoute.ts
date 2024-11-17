import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// GET /api/restaurant/search/city
router.get(
  "/search/:city",
  param("city").isString().trim().notEmpty().withMessage("City parameter must be a valid string"),
  RestaurantController.searchRestaurant as express.RequestHandler
);

export default router;
