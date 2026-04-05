import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { appointmentSchema } from "../validation/appointment.validation.js";
import { prisma } from "../config/prisma.client.js";
import { AppointmentStatus, Gender } from "../generated/enums.js";

export const bookAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { providerId } = req.params;
    console.log("userid", userId);

    if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
}
    

    // Validate params
    if (!providerId) {
      return res.status(400).json({
        success: false,
        message: "Provider ID is required",
      });
    }

    //  Joi validation
    const value  = await appointmentSchema.validateAsync(req.body);


    const { timeSlot, gender, reason } = value;

    const slotDate = new Date(timeSlot);

    // Prevent past booking
    if (slotDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Cannot book past time slots",
      });
    }

    const provider = await prisma.provider.findUnique({
      where: { id: providerId as string },
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    //  Check already booked
    const existing = await prisma.appointment.findFirst({
      where: {
        providerId: providerId as string,
        timeSlot: slotDate,
        status: AppointmentStatus.BOOKED,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked",
      });
    }

  const appointment = await prisma.appointment.create({
  data: {
    user: {
      connect: { id: userId as string },
    },
    provider: {
      connect: { id: providerId as string},
    },
    timeSlot: slotDate,
    gender: gender as Gender,
    reason: reason || null,
  },
});
    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Slot already booked.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    //  query params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    

    const skip = (page - 1) * limit;

    //  total count
    const total = await prisma.appointment.count({
      where: { userId: userId as string },
    });

    const appointments = await prisma.appointment.findMany({
      where: { userId: userId as string },
      include: {
        provider: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    return res.status(200).json({
      success: true,
      data: appointments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: id as string },
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    //  Ownership check
    if (appointment.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action",
      });
    }

    //  Already cancelled
    if (appointment.status === AppointmentStatus.CANCELLED) {
      return res.status(400).json({
        success: false,
        message: "Appointment already cancelled",
      });
    }

    const updated = await prisma.appointment.update({
      where: { id: id as string },
      data: {
        status: AppointmentStatus.CANCELLED,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Appointment cancelled",
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};