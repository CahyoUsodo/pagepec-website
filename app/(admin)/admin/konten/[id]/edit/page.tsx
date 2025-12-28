import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { ContentForm } from "@/components/admin/content-form";

export default async function EditKontenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const content = await prisma.content.findUnique({
    where: { id },
  });

  if (!content) {
    redirect("/admin/konten");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Konten</h1>
        <ContentForm
          initialData={{
            id: content.id,
            type: content.type,
            title: content.title,
            slug: content.slug || undefined,
            description: content.description || undefined,
            body: content.body || undefined,
          }}
        />
      </div>
    </div>
  );
}

