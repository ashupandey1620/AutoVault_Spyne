import { Router } from "express";

import { authenticateToken } from "../middleware/authMiddleware";
import carController from "../controllers/carController";
import multer from "multer";

const router = Router();

// Configure Multer for File Uploads
const storage = multer.memoryStorage(); // Keep files in memory (useful for Cloudinary)
const upload = multer({ storage });

//candidates data routes
router.post("/car",upload.array("images", 10), authenticateToken, carController.addCar);
router.get("/getCar/:id", authenticateToken, carController.getCar);
router.get("/getAllCar", authenticateToken, carController.getAllCar);


router.get("/deleteCar/:id", authenticateToken, carController.deleteCar);
router.get("/deleteAllCar", authenticateToken, carController.deleteAllCar);

router.post("/updateCar", authenticateToken, carController.updateCar);

export default router;
