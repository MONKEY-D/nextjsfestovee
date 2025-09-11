import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/databaseConnection";
import { catchError } from "@/lib/helperFunctions";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";
import z from "zod";

export async function POST(request) {
    try {
        await connectDB()
        const payload = await request.json()

        const validationSchema = zSchema.pick({
            email: true,
        }).extend({
            password: z.string()
        })

        const validatedData = validationSchema.safeParse(payload)

        if (!validatedData.success) {
            return response(false, 401, 'Invalid or missing input field.', validatedData.error)
        }

        const { email, password } = validatedData.data

        const getUser = await UserModel.findOne({ email })
        if (!getUser) {
            return response(false, 404, "Invalid login credentials.", validatedData.error)
        }

        //resend email verification link
        if (!getUser.isEmailVerified) {
            const secret = new TextEncoder().encode(process.env.SECRET_KEY);
            const token = await new SignJWT({ userId: getUser._id.toString() })
                .setIssuedAt()
                .setExpirationTime("1h")
                .setProtectedHeader({ alg: "HS256" })
                .sign(secret);

            await sendMail(
                "Email Verification request from Kartik Verma",
                email,
                emailVerificationLink(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
                )
            );
            return response(false, 400, "Your email is not verified, we have sent a verification link to your registered email address.")

        }

        //password verification
        const isPasswordVerified = await getUser.comparePassword(password)
        if (!isPasswordVerified) {
            return response(false, 400, "Invalid login credentials.")
        }

        //otp generation

    } catch (error) {
        return catchError(error)
    }
}