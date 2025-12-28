import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { ArticleForm } from "@/components/admin/article-form";

export default async function EditArtikelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      featuredImage: {
        select: { id: true, url: true },
      },
    },
  });

  if (!article) {
    redirect("/admin/artikel");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Artikel</h1>
        <ArticleForm
          initialData={{
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || undefined,
            content: article.content,
            published: article.published,
            featuredImageId: article.featuredImageId || undefined,
          }}
        />
      </div>
    </div>
  );
}

