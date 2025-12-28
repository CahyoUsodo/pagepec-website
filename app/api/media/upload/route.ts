import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file);

    // Determine media type
    const isVideo = file.type.startsWith("video/");
    const mediaType = isVideo ? "VIDEO" : "IMAGE";

    // Save to database
    const media = await prisma.media.create({
      data: {
        type: mediaType,
        url: uploadResult.url,
        cloudinaryId: uploadResult.publicId,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        size: uploadResult.size,
        title: file.name,
        uploadedBy: (session.user as any).id,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

