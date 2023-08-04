import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  params: { params: { username: string } }
) => {
  const { username } = params.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        preferences: true,
        links: true,
      },
    });

    if (!user)
      return NextResponse.json({
        status: 404,
        message: `Couldn't find user named ${username}`,
      });

    return NextResponse.json({
      status: 200,
      user: user,
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
};
