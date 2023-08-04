import { authOptions, checkSession } from "@/lib/auth";
import { prisma } from "@/prisma/prisma";
import axios from "axios";
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

  const { id, icon, title, href, target } = await req.json();

  if (!thereIsASession)
    return NextResponse.json({
      status: 401,
      message: "Unauthorized request try",
    });

  try {
    // * Upload to imgbb
    const { data: imgbbRes }: any = await axios.post(
      "https://api.imgbb.com/1/upload",
      {
        key: process.env.IMGBB_KEY,
        image: icon.replace(/^data:image\/?[A-z]*;base64,/, ""),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!(imgbbRes.status === 200 && imgbbRes.success)) {
      return NextResponse.json({
        status: 500,
        message: "Error occured while trying to upload icon",
      });
    }

    // * Update mongodb
    await prisma.link.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        icon: imgbbRes.data.display_url,
        href: href,
        target: target,
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Link updated successfully!",
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
};
