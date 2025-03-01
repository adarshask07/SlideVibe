"use server"
import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";

export const getAllProjects = async () => {
    try {   
        const checkUser = await onAuthenticateUser()
        if(checkUser.status ===200 || !checkUser.user){
            return {
                status : 403,
                error : "User Unauthorized"
            }
        }
        const projects = await client.project.findMany({
            where :{
                userId : checkUser.user.id,
                isDeleted : false
            },
            orderBy : {
                updatedAt: 'desc'
            }
        })

        if (projects.length ===0){
            return {
                status : 404 ,
                error : "No Projects Found"
            }
        }
        return {
            status : 200,
            data : projects
        }
        
    } catch (error) {
        console.log("ERROR_GETALLPROJECTS", error) ;
        return {
            status : 500 ,
            error : "Internal Server Error"
        }
        
    }
}


export const getRecentProjects = async ()=>{
    try {
        const checkUser = await onAuthenticateUser() ;
        if(checkUser.status ===200 || !checkUser.user){
            return {
                status : 403,
                error : "User Unauthorized"
            }
        }

        const recentProjects = await client.project.findMany({
            where :{
                userId : checkUser.user.id,
                isDeleted : false,

            },
            orderBy :{
                updatedAt : 'desc'
            }, 
            take : 5
            
        })

        if(recentProjects.length===0){
            return {
                status: 404 ,
                error : "No Projects Found"
            }

        }

        return {
            status : 200,
            data : recentProjects
        }

    } catch (error) {
        console.log("ERROR_GETRECENTPROJECTS", error) ;
        return {
            status : 500,
            error : "Internal Server Error"
        }
    }
}


export const recoverProject = async (projectId : string) => {
    try {
        const checkUser = await onAuthenticateUser() ;
        if(checkUser.status ===200 || !checkUser.user){
            return {
                status : 403,
                error : "User Unauthorized"
            }
        }
        const project = await client.project.update({
            where : {
                id : projectId
            },
            data : {
                isDeleted : false
            }
        })

        if(!project){
            return {
                status : 500,
                error : "Failed to recover the project"
            }
        }

        return {
            status : 200,
            data : project
        }

    } catch (error) {
        console.log("ERROR_RECOVERPROJECT", error) ;
        return {
            status : 500,
            error : "Internal Server Error"
        }
    }
}


export const deleteProject = async (projectId : string) => {
    try {
        const checkUser = await onAuthenticateUser() ;
        if(checkUser.status ===200 || !checkUser.user){
            return {
                status : 403,
                error : "User Unauthorized"
            }
        }
        const project = await client.project.update({
            where : {
                id : projectId
            },
            data : {
                isDeleted : true
            }
        })

        if(!project){
            return {
                status : 500,
                error : "Failed to delete the project"
            }
        }

        return {
            status : 200,
            data : project
        }

    } catch (error) {
        console.log("ERROR_DELETEPROJECT", error) ;
        return {
            status : 500,
            error : "Internal Server Error"
        }
    }
}