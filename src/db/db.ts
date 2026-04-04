import { prisma } from "../config/prisma.client.js";


export const connectToDatabase = async () => {
    try {
       await prisma.$connect();
       await prisma.$queryRaw`SELECT 1`;
        
        console.log(`Database connected successfully...`);
        
    } catch (error) {
        console.log(`failed to connect database : ${error}`);
        process.exit(1);
    }
}