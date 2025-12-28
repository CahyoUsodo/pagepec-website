import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { type, title, slug, description, body: bodyContent } = body;

    const content = await prisma.content.update({
      where: { id },
      data: {
        type,
        title,
        slug: slug || null,
        description: description || null,
        body: bodyContent || null,
        updatedBy: (session.user as any).id,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

