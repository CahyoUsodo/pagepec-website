import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="PEC Logo"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              PEC
            </span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              Beranda
            </Link>
            <Link href="/tentang-kami" className="text-gray-700 hover:text-orange-600 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/program" className="text-gray-700 hover:text-orange-600 transition-colors">
              Program
            </Link>
            <Link href="/galeri" className="text-gray-700 hover:text-orange-600 transition-colors">
              Galeri
            </Link>
            <Button asChild variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              <Link href="/admin/login">Admin</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

