import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function GET(request) {
    let users = []
    try {
        await connectDb();
        users = await User.find().select('-password')

    } catch(error) {
        console.log(error);
        return NextResponse.json({
            message: "failed to get users",
            success: false,
        });

    }
    return NextResponse.json(users);

}

export async function POST(request){

    // fetch user deatil from request
    const {name, email, password, about, profileURL} = await request.json();

    // create user object with user model
    console.log({name, email, password, about, profileURL});

    const user = new User({
        name, 
        email, 
        password, 
        about, 
        profileURL

    });
    try {
        // save the object to database
        user.password = bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT));
        console.log(user);
        await connectDb();
       const createdUser = await user.save()

       const response = NextResponse.json(user, {
          status: 201,
       });
    return response;
    }catch(error) {
        console.log(error);
        return NextResponse.json({
            message:"failed to create user",
            status:false,
        }, {
            status: 500,
        });

   }


    // const body = request.body;
    // console.log(body);
    // console.log(request.method);
    // console.log(request.cookies);
    // console.log(request.headers);

    // return NextResponse.json({
    //     message: "posting user data",
    // });
}
export function DELETE(request){
    console.log("delete api called");
    return NextResponse.json({
        message: "deleted !!",
        status: true,
    });

}
export function PUT(){

}

