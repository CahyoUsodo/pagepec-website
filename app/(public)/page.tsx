import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lembaga Pendidikan Bahasa Inggris - PagePEC",
  description: "Lembaga pendidikan bahasa Inggris terpercaya dengan program pembelajaran berkualitas tinggi",
  openGraph: {
    title: "Lembaga Pendidikan Bahasa Inggris - PagePEC",
    description: "Lembaga pendidikan bahasa Inggris terpercaya dengan program pembelajaran berkualitas tinggi",
    type: "website",
  },
};

export default async function HomePage() {
  const homepageContent = await prisma.content.findFirst({
    where: { type: "HOMEPAGE" },
  });

  const programs = await prisma.content.findMany({
    where: { type: "PROGRAM" },
    take: 3,
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "PagePEC",
    description: homepageContent?.description || "Lembaga pendidikan bahasa Inggris terpercaya",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {homepageContent?.title || "Selamat Datang di Lembaga Pendidikan Kami"}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-orange-50">
                {homepageContent?.description || 
                  "Tingkatkan kemampuan bahasa Inggris Anda bersama kami"}
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  <Link href="/program">Lihat Program</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/tentang-kami">Tentang Kami</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Program Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">
                    {program.description || "Program pembelajaran bahasa Inggris yang komprehensif."}
                  </p>
                  <Button asChild variant="outline">
                    <Link href={`/program/${program.slug || program.id}`}>
                      Pelajari Lebih Lanjut
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Siap Memulai Perjalanan Belajar Anda?</h2>
            <p className="text-xl mb-8 text-orange-50">
              Hubungi kami hari ini untuk informasi lebih lanjut
            </p>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
              Hubungi Kami
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
