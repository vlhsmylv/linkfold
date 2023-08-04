import { authOptions, checkSession } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    status: 405,
    message: "Method is not supported",
  });
};

export const POST = async (req: Request) => {
  const session: any = await getServerSession(authOptions);
  const thereIsASession = checkSession(session);

  const { instagram, twitter, linkedin } = await req.json();

  if (!thereIsASession)
    return NextResponse.json({
      status: 401,
      message: "Unauthorized request try",
    });

  try {
    // * Update mongodb
    await prisma.user.update({
      where: {
        id: session.user.uid,
      },
      data: {
        socials: {
          instagram: instagram,
          twitter: twitter,
          linkedin: linkedin,
        },
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Social links updated successfully!",
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
};
