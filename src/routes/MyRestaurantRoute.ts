import express from "express";
import multer from "multer";
import RestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateRestaurantRequest } from "../middleware/validation";

const router = express.Router();

// initialize the multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// POST /api/my/restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse as express.Handler,
  RestaurantController.createRestaurant as express.RequestHandler
);

// GET /api/my/restaurant
router.get(
  "/",
  jwtCheck,
  jwtParse as express.Handler,
  RestaurantController.getRestaurant as express.RequestHandler
);

// PUT /api/my/restaurant
router.put(
  "/",
  upload.single("imageFile"),
  validateRestaurantRequest,
  jwtCheck,
  jwtParse as express.Handler,
  RestaurantController.updateRestaurant as express.RequestHandler
);

export default router;
