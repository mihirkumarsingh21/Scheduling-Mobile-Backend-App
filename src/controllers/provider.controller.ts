import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { prisma } from "../config/prisma.client.js";
import { providerSchema } from "../validation/provider.validation.js";
import { ProviderCategory } from "../generated/enums.js";

// CREATE PROVIDER
export const createProvider = async (req: AuthRequest, res: Response) => {
  try {
    // Joi validation
    const value = await providerSchema.validateAsync(req.body);

    const { name, category, image, description } = value;

    // normalize category
    const normalizedCategory = category.toUpperCase();

    // enum validation
    if (!Object.values(ProviderCategory).includes(normalizedCategory)) {
      return res.status(400).json({
        success: false,
        message: "Invalid provider category",
      });
    }

    const provider = await prisma.provider.create({
      data: {
        name,
        category: normalizedCategory,
        image: image || null,
        description: description || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Provider created successfully",
      data: provider,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


export const getProviders = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (page < 1 || limit < 1) {
  return res.status(400).json({
    success: false,
    message: "Invalid pagination params",
  });
}

    const skip = (page - 1) * limit;

    const total = await prisma.provider.count({
      where: { 
        isDeleted: false 
      },
    });

    const providers = await prisma.provider.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    return res.status(200).json({
      success: true,
      data: providers,
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

export const getProviderById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provider ID is required",
      });
    }

    const provider = await prisma.provider.findUnique({
      where: { id: id as string },
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProvider = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Provider ID is required",
      });
    }

    // check provider exist
    const provider = await prisma.provider.findUnique({
      where: { id: id as string },
    });

    if (!provider || provider.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    // soft delete
    const updated = await prisma.provider.update({
      where: { id: id as string },
      data: {
        isDeleted: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Provider deleted successfully",
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};