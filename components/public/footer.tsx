import Link from "next/link";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="PEC Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <h3 className="text-xl font-bold">PEC</h3>
            </div>
            <p className="text-gray-400">
              Lembaga pendidikan bahasa Inggris terpercaya untuk masa depan yang lebih baik.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tautan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-white">
                  Program
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-white">
                  Galeri
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@pagepec.com</li>
              <li>Telepon: +62 XXX XXX XXXX</li>
              <li>WhatsApp: +62 XXX XXX XXXX</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              {/* Social media links can be added here */}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PagePEC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

