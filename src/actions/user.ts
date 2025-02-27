'user server'
import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser() ;
        if(!user) {
            return {
                status : 403,
            }
        }
        const existingUser = await client.user.findUnique({
            where :{
                clerkId : user.id ,
            },
            include: {
                PurchasedProjects :{
                    select :{
                        id : true
                    },
                },
            },
            
        })
        if(existingUser) {
            return {
                status : 200 ,
                user : existingUser,
            }
        }
        const newUser = await client.user.create({
            data :{
                clerkId : user.id,
                email : user.emailAddresses[0].emailAddress,
                name : user.firstName + " " + user.lastName,
                profileImage : user.imageUrl
            }
        })

       if(newUser){
              return {
                status : 201,
                user : newUser,
              }
       } else {
              return {
                status : 404
              }
       }

    } catch (error) {
        console.log("ERRO_ONAUTHENTICATEDUSER", error) ;
        return {
            status : 500 ,
            error : "Internal Server Error"
        }
    }
}