import { transport } from "./nodemailer.config.js";
import { REGISTRATION_SUCCESS_TEMPLATE } from "./email.template.js";

export const sendingSuccessRegEmail = async (email: string, userName: string, verificationCode: string, verifyUrl: string) => {

    try {
        const info = await transport.sendMail({
        from: process.env.USER_EMAIL ,
        to: email,
        subject: "Successfully register",
        html: REGISTRATION_SUCCESS_TEMPLATE
        .replace("{username}", userName) 
        .replace("{verificationCode}", verificationCode) 
        .replace("{verifyURL}", verifyUrl)
        
    })


    return {
        success: true, emailResponse: info
    }


    } catch (error) {
        
        console.log(`Failed to send successfully register email to user : ${error}`);
        throw new Error(`Failed to send successfully register email to user : ${error}`);
        
    }

} 