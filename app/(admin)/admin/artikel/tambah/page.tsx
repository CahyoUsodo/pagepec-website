import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { ArticleForm } from "@/components/admin/article-form";

export default async function TambahArtikelPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tambah Artikel</h1>
        <ArticleForm />
      </div>
    </div>
  );
}

