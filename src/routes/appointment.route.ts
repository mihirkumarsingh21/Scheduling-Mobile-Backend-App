import { Router } from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { bookAppointment, cancelAppointment, getMyAppointments } from "../controllers/appointment.controller.js";

const router = Router();

router.use(protectedRoute);
router.post("/:providerId", bookAppointment);
router.get("/all",  getMyAppointments);
router.patch("/:id/cancel",  cancelAppointment);

export default router;