"use server";
import { getUserIdFromSession } from "@/lib/auth"
import prisma from "@/lib/prisma";

export async function getfeedbackbyId(id:string){
    
    try {
        const user = await getUserIdFromSession();
        if(!user){
            throw new Error('unauthorized')
        }
        if(!id) throw new Error("no id present")

        const feeback = await prisma.feedback.findFirst({
            where:{
                presentationId:id
            },
            include:{
                slideTips:true,
                presentation:{
                    include:{
                        slides:true
                    }
                }
            }

        })
        if(!feeback){
            throw new Error('no feeback found')
        }
        return feeback;
    } catch (error:any) {
        console.error(error.message||'internal server error')
        throw new Error("internal server error")
    }
}