import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { MediaUpload } from "@/components/admin/media-upload";
import { MediaGrid } from "@/components/admin/media-grid";

export default async function MediaPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      uploadedByUser: {
        select: { name: true },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kelola Media</h1>
        </div>

        <div className="mb-8">
          <MediaUpload />
        </div>

        <MediaGrid media={media} />
      </div>
    </div>
  );
}

