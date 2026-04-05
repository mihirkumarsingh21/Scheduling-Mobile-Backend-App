import type { NextFunction, Response } from "express";
import type { AuthRequest } from "./auth.middleware.js";
import { prisma } from "../config/prisma.client.js";
import { UserRole } from "../generated/enums.js";



export const admin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId as string },
        });

        if (!user || user.role !== UserRole.ADMIN) {
            return res.status(403).json({
                success: false,
                message: "Access denied: Only Admin allowed",
            });
        }

        next();
    } catch (error: any) {
        console.log("Admin middleware error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
};
