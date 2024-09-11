import dbConnnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model"; 
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req : Request){
    await dbConnnect()
    try{
        const {username , email , password} = await req.json()
        const existinguserbyUsername = await UserModel.findOne({
            username,
            isVerified : true
        })

        if(existinguserbyUsername){
            return Response.json({
                success : false,
                message :"Username is already taken"
            } , {status:400})
        }

        const existinguserbyEmail = await UserModel.findOne({
            email
        })

        const verifyCode = Math.floor(10000 + Math.random() * 900000).toString()

        if(existinguserbyEmail){
            if(existinguserbyEmail.isVerified){
                return Response.json({
                    success : false,
                    message : "User already exist with this email"
                } , {status : 500})
    
            }else{
                const hashedPassword = await bcrypt.hash(password,10);
                existinguserbyEmail.password = hashedPassword;
                existinguserbyEmail.verifyCode = verifyCode;
                existinguserbyEmail.verifyCodeExpiry = new Date(Date.now() + 360000);
                await existinguserbyEmail.save();
            }
        }else{
            const hashedPassword = await bcrypt.hash(password , 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password : hashedPassword,
                verifyCode,
                verifyCodeExpiry : expiryDate,
                isVerified : false,
                isAcceptingMessage : true,
                messages: []

            })

            await newUser.save();
        }

        // send verification mail
        const emailResponse = await sendVerificationEmail(
            email , username , verifyCode
        )

        if(!emailResponse.success){
            return Response.json({
                success : false,
                message : emailResponse.message
            } , {status : 500})
        }

        return Response.json({
            success : true,
            message : "Send Successfuddy"
        } , {status:200})
 





    }catch(error){
        console.error("Error Registering User",error);
        return Response.json({
            success : false,
            message : "Error Registering User"
        },{
            status : 500
        })

    }
}