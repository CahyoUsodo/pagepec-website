import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program - PagePEC",
  description: "Program pembelajaran bahasa Inggris yang kami tawarkan",
  openGraph: {
    title: "Program - PagePEC",
    description: "Program pembelajaran bahasa Inggris yang kami tawarkan",
    type: "website",
  },
};

export default async function ProgramPage() {
  const programs = await prisma.content.findMany({
    where: { type: "PROGRAM" },
    orderBy: { createdAt: "desc" },
  });

  type ProgramType = typeof programs[0];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Program Kami</h1>
        
        {programs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada program yang tersedia.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program: ProgramType) => (
              <Card key={program.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>
                    {program.description || "Program pembelajaran bahasa Inggris"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/program/${program.slug || program.id}`}>
                      Pelajari Lebih Lanjut
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
