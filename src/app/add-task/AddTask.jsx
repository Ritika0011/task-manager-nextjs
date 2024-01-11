"use client"
import React, { useState } from 'react'
import loginSvg from "../../assets/login.svg"
import Image from 'next/image'
import { addTask } from '@/services/taskService'
import { toast } from 'react-toastify';


const AddTask = () => {

  const [task, setTask ] = useState({
    title: "",
    content: "",
    status: "none",
    // temporary solution
    userId: "658d6ee06c181837bd925389",
  });


  const handleAddTask= async(event) => {

    event.preventDefault();
    console.log(task);
    // validate task data

    try{
      const result = await addTask(task);
      console.log(result);
      toast.success("Your task is added", {
        position:"top-center"
      });
      setTask({
        title: "",
        content: "",
        status:"none",
      });

    }catch(error) {
      console.log(error);
      toast.error("Task not added", {
        position:"top-center"
      })

    }




  }
  return (
    <div className='grid grid-cols-12  justify-center'>
        <div className='col-span-4 col-start-5 p-5 shadow-orange-300 shadow'>
          <div className='my-8 flex justify-center'>
            <Image src={loginSvg} style={{
              width: "50%",
            }} alt='banner-Image'/>
          </div>
          <h1 className='text-3xl'>Add your task here !!</h1>
          <form action="#!" onSubmit={handleAddTask}>
            <div className='mt-4'>
              <label htmlFor="task_title" className='block text-sm font-medium mb-2'>Title</label>
              <input type="text" className='border border-gray-300 rounded-lg w-full p-3 bg-gray-400 focus:ring-gray-400-100' id='task_title' name='task_title' onChange={(event)=>{
                setTask({
                  ...task,
                  title: event.target.value,
                });
              }}
              value={task.title} />
            </div>
            {/* Task content */}
            <div className='mt-4'>
              <label htmlFor="task_content" className='block text-sm font-medium mb-2'>Content</label>
              <textarea className='border border-gray-300 rounded-lg w-full p-3 bg-gray-400 focus:ring-gray-400-100' id='task_content'  rows={5}  name='task_content' onChange={(event)=>{
              setTask({
                ...task,
                content: event.target.value,
              });
            }}
            value={task.content}
            />
            </div>
            {/* Task status */}
            <div className='mt-4'>
              <label htmlFor="task_status" className='block text-sm font-medium mb-2'>Status</label>
              <select id="task_status" className='border border-gray-300 rounded-lg w-full p-3 bg-gray-400 focus:ring-gray-400-100 ' name='task_status' onChange={(event) => {
                setTask({
                  ...task,
                  status: event.target.value,
                });
              }}
              value={task.status}
              >
                <option value="none" disabled>---Select Status---</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {/* Button action */}

            <div className='mt-4 flex justify-center'>
              <button className='bg-orange-300 py-2 px-3 rounded-lg hover:bg-orange-400'>Add Task</button>
              <button className='bg-orange-300 py-2 px-3 rounded-lg hover:bg-orange-400 ms-4'>Clear</button>

            </div>
            {/* {
                JSON.stringify(task)
            } */}
          </form>
        </div>
      
    </div>
  )
}

export default AddTask;
