import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function KontenPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const contents = await prisma.content.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      createdByUser: {
        select: { name: true },
      },
    },
  });

  type ContentType = typeof contents[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kelola Konten</h1>
          <Button asChild>
            <Link href="/admin/konten/tambah">Tambah Konten</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content: ContentType) => (
            <Card key={content.id}>
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>
                  Tipe: {content.type} | Dibuat oleh: {content.createdByUser.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {content.description || "Tidak ada deskripsi"}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/admin/konten/${content.id}/edit`}>Edit</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {contents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Belum ada konten.</p>
            <Button asChild>
              <Link href="/admin/konten/tambah">Tambah Konten Pertama</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

