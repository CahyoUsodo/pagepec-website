import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Galeri - PagePEC",
  description: "Galeri foto dan video kegiatan lembaga pendidikan kami",
  openGraph: {
    title: "Galeri - PagePEC",
    description: "Galeri foto dan video kegiatan lembaga pendidikan kami",
    type: "website",
  },
};

export default async function GaleriPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  type MediaType = typeof media[0];

  const images = media.filter((m: MediaType) => m.type === "IMAGE");
  const videos = media.filter((m: MediaType) => m.type === "VIDEO");

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Galeri</h1>
        
        {images.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Foto</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image: MediaType) => (
                <Card key={image.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={image.url}
                        alt={image.title || "Galeri foto"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Video</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video: MediaType) => (
                <Card key={video.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative" style={{ paddingBottom: "56.25%" }}>
                      <video
                        src={video.url}
                        controls
                        className="absolute top-0 left-0 w-full h-full"
                      >
                        Browser Anda tidak mendukung video.
                      </video>
                    </div>
                    {video.title && (
                      <div className="p-4">
                        <h3 className="font-semibold">{video.title}</h3>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {media.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Belum ada media yang tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
