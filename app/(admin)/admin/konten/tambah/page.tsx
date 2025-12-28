import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { ContentForm } from "@/components/admin/content-form";

export default async function TambahKontenPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tambah Konten</h1>
        <ContentForm />
      </div>
    </div>
  );
}

