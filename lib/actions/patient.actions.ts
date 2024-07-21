"use server";
import {ID, Query} from "node-appwrite";
import {parseStringify} from "@/lib/utils";
import {users} from "@/lib/appwrite.config";

export const createUser = async ( user: CreateUserParams) => {
    try{
        console.log("Creating user...");
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        return parseStringify(newUser)
    }catch(error: any){
        console.log(error);
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal("email", [user.email])
            ])

            return documents?.users[0]
        }
        console.error("An error occurred while creating a new user:", error);
    }
}
