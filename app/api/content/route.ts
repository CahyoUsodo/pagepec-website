import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, title, slug, description, body } = body;

    if (!title || !type) {
      return NextResponse.json(
        { error: "Title and type are required" },
        { status: 400 }
      );
    }

    const content = await prisma.content.create({
      data: {
        type,
        title,
        slug: slug || null,
        description: description || null,
        body: body || null,
        createdBy: (session.user as any).id,
        updatedBy: (session.user as any).id,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Content create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

