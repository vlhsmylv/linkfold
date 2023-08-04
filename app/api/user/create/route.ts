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
