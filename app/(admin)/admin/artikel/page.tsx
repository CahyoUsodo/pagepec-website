import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ArtikelPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      createdByUser: {
        select: { name: true },
      },
      featuredImage: {
        select: { url: true },
      },
    },
  });

  type ArticleType = typeof articles[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kelola Artikel</h1>
          <Button asChild>
            <Link href="/admin/artikel/tambah">Tambah Artikel</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: ArticleType) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="flex-1">{article.title}</CardTitle>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      article.published
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </div>
                <CardDescription>
                  Dibuat oleh: {article.createdByUser.name}
                  {article.publishedAt && (
                    <> | Diterbitkan: {new Date(article.publishedAt).toLocaleDateString("id-ID")}</>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {article.excerpt || "Tidak ada excerpt"}
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/admin/artikel/${article.id}/edit`}>Edit</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Belum ada artikel.</p>
            <Button asChild>
              <Link href="/admin/artikel/tambah">Tambah Artikel Pertama</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

