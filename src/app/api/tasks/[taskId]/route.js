
//api/tasks/{taskId}

import { NextResponse } from "next/server";
import { Task } from "@/models/task";
import { getResponseMessage } from "@/helper/responseMessage";
import { connectDb } from "@/helper/db";

connectDb();


// get single tasks
export async function GET(request, {params}) {
    const { taskId } = params;

    try{
        await connectDb();
        const task = await Task.findById(taskId);
        return NextResponse.json(task);

    }catch(error){
        return getResponseMessage("Error in getting task !!", 404, false);

    }


}

export async function PUT(request, { params }) {
    try{
        const { taskId } = params;

        const {title, content, status} = await request.json();
        let task = await Task.findById(taskId);

        task.title = title;
        task.content = content;
        task.status = status;
        await connectDb();
        const updatedtask = await task.save();
        return NextResponse.json(updatedtask);
    }catch(error) {
        console.log(error);
        return getResponseMessage("Failed to update task",404,false);

    }

    
}
export async function DELETE(request, { params }) {
    const { taskId } = params;
    try {
        await connectDb();
        await Task.deleteOne({
            _id: taskId,

        });
        return getResponseMessage("Task deleted !!",202,true);
        
    }catch(error){
        console.log(error);
        return getResponseMessage("Task failed to deleted !!",404,false);

    }
    
}