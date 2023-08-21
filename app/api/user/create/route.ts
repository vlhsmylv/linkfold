import { prisma } from "@/prisma/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    status: 400,
    message: "Method is not supported",
  });
};

export const POST = async (request: Request) => {
  const {
    name,
    username,
    email,
    password,
  }: { name: string; username: string; email: string; password: string } =
    await request.json();

  try {
    const hashedPassword = await hash(password, 12);

    if (name.length >= 30) {
      return NextResponse.json({
        success: false,
        message: "Name cannot be more than 30 characters",
      });
    }

    if (username.length >= 20 || username.length <= 5) {
      return NextResponse.json({
        success: false,
        message:
          "Username cannot be less than 5 characters or more than 20 characters",
      });
    }

    if (!!!/^[a-z0-9_\.]+$/.exec(username)) {
      return NextResponse.json({
        success: false,
        message:
          "Username can only have lowercase letters, numbers from 0 to 9, dots (.), and underscores (_)",
      });
    }

    if (password.length <= 8) {
      return NextResponse.json({
        success: false,
        message: "Password should be more than 8 characters",
      });
    }

    const createUser = await prisma.user.create({
      data: {
        name: name,
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        username: username,
        email: email,
        password: hashedPassword,
        bio: `Hello, I am ${name}!`,
        socials: {},
      },
    });

    await prisma.preferences.create({
      data: {
        userId: createUser.id,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "User created",
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
};
