import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminNavbar } from "@/components/admin/admin-navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await Promise.all([
    prisma.content.count(),
    prisma.media.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.fAQ.count({ where: { published: true } }),
  ]);

  const [contentCount, mediaCount, articleCount, faqCount] = stats;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Konten</CardTitle>
              <CardDescription>Total konten</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{contentCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Gambar & Video</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mediaCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Artikel</CardTitle>
              <CardDescription>Artikel diterbitkan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{articleCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Pertanyaan aktif</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{faqCount}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/konten">Kelola Konten</Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/media">Kelola Media</Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/artikel">Kelola Artikel</Link>
              </Button>
              <Button asChild className="w-full" variant="outline">
                <Link href="/admin/faq">Kelola FAQ</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

