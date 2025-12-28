"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Media {
  id: string;
  type: "IMAGE" | "VIDEO";
  url: string;
  title: string | null;
  createdAt: Date;
  uploadedByUser: {
    name: string;
  };
}

export function MediaGrid({ media }: { media: Media[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus media ini?")) return;

    setDeleting(id);
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Gagal menghapus media");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setDeleting(null);
    }
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Belum ada media yang diupload.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {media.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-square group">
              {item.type === "IMAGE" ? (
                <Image
                  src={item.url}
                  alt={item.title || "Media"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {item.title && (
              <div className="p-2">
                <p className="text-sm font-medium truncate">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

