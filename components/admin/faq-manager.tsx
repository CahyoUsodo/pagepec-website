"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
}

export function FAQManager({ faqs: initialFaqs }: { faqs: FAQ[] }) {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ question: "", answer: "", published: true });

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData({ question: faq.question, answer: faq.answer, published: faq.published });
  };

  const handleSave = async (id?: string) => {
    try {
      const url = id ? `/api/faq/${id}` : "/api/faq";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.refresh();
        setEditingId(null);
        setIsAdding(false);
        setFormData({ question: "", answer: "", published: true });
      } else {
        alert("Gagal menyimpan FAQ");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus FAQ ini?")) return;

    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Gagal menghapus FAQ");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah FAQ
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Tambah FAQ Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Pertanyaan</Label>
              <Input
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Masukkan pertanyaan"
              />
            </div>
            <div>
              <Label>Jawaban</Label>
              <Textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Masukkan jawaban"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleSave()}>Simpan</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {faqs.map((faq) => (
        <Card key={faq.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>
                  {editingId === faq.id ? (
                    <Input
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    />
                  ) : (
                    faq.question
                  )}
                </CardTitle>
                <CardDescription>
                  Status: {faq.published ? "Published" : "Draft"}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {editingId === faq.id ? (
                  <>
                    <Button size="icon" onClick={() => handleSave(faq.id)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="icon" variant="outline" onClick={() => handleEdit(faq)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {editingId === faq.id ? (
              <Textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={4}
              />
            ) : (
              <p className="text-gray-600">{faq.answer}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

