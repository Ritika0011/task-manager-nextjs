
// tasks
import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";


// Get all the tasks
export async function GET(request) {
    try{
        await connectDb();
        const tasks = await Task.find();
        return NextResponse.json(tasks);
    }catch(error) {
        console.log(error);
        return getResponseMessage("Error is getting data!!", 404, false);
    }


} 

// create all tasks
export async function POST(request) {
    const{ title,content,userId, status } = await request.json();

    //fetching logged in userId
    const authToken = request.cookies.get("authToken")?.value;
    //console.log(authToken);
    const data = jwt.verify(authToken, process.env.JWT_KEY);
    console.log(data._id);

    //console.log({title,content,userId});
    const task = new Task({
        title,
        content,
        userId:data._id,
        status,
    });
    await connectDb();

    try{

        const createdtask = await task.save();
        const response = NextResponse.json(task, {
            status:201,
        });
        return response;

    }catch(error) {
        console.log(error);
        return getResponseMessage("Failed to create Taks !!", 500, false);

    }
}

