import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs"
import dbConnnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export const authOptions:NextAuthOptions = {
    providers : [
        CredentialsProvider({
            id : "credentials",
            name : "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Your Em" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials:any):Promise<any> {
                await dbConnnect();
                try{
                    const user = await UserModel.findOne({
                        $or : [
                            {email : credentials.identifier},
                            {username : credentials.identifier},
                        ]
                    })
                    if(!user){
                        throw new Error("No User Found With This Email...")
                    }
                    if(user.isVerified){
                        throw new Error("Please verify Your Account Please...")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password , user.password)
                    if(isPasswordCorrect){
                        return user;
                    }else{
                        throw new Error("Incorrect Password")

                    }
                }catch(error : any){
                    throw new Error()
                }
               
            }
        })
    ],
    callbacks:{
        async jwt({token , user}){
            return token;
        },
        async session({session ,token}){
            return session
        },       
    },
    pages : {
        signIn : '/sign-in',
        signOut : '/sign-out'

    },
    session : {
        strategy : 'jwt'
    },
    secret : process.env.NEXT_AUTH_SECRET
}