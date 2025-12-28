import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - PagePEC",
  description: "Pelajari lebih lanjut tentang lembaga pendidikan bahasa Inggris kami",
  openGraph: {
    title: "Tentang Kami - PagePEC",
    description: "Pelajari lebih lanjut tentang lembaga pendidikan bahasa Inggris kami",
    type: "website",
  },
};

export default async function TentangKamiPage() {
  const aboutContent = await prisma.content.findFirst({
    where: { type: "ABOUT" },
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            {aboutContent?.title || "Tentang Kami"}
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Visi & Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {aboutContent?.body ? (
                  <div dangerouslySetInnerHTML={{ __html: aboutContent.body }} />
                ) : (
                  <p className="text-gray-600">
                    {aboutContent?.description || 
                      "Kami adalah lembaga pendidikan bahasa Inggris yang berkomitmen untuk memberikan pendidikan berkualitas tinggi dan membantu siswa mencapai potensi terbaik mereka."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Visi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Menjadi lembaga pendidikan bahasa Inggris terdepan yang menghasilkan lulusan berkualitas dan siap bersaing di era global.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Misi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Menyediakan program pembelajaran yang inovatif, berkualitas, dan terjangkau untuk semua kalangan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
