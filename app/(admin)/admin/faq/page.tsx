import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import { FAQManager } from "@/components/admin/faq-manager";

export default async function FAQPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Kelola FAQ</h1>
        <FAQManager faqs={faqs} />
      </div>
    </div>
  );
}

