import type { Metadata } from "next";
import "./globals.css";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";

export const metadata: Metadata = {
  title: "Meu App",
  description: "App Next da CC UPF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        {/* CSS do Bootstrap (CDN) */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        { /* Aqui nosso template, o componente page inicial com 2 subcomponentes */ }
        <div className="min-vh-100 d-flex flex-column">
          <PublicHeader />
          <main className="flex-grow-1">{children}</main>
          <PublicFooter />
        </div>

        {/* JS do Bootstrap (para navbar colapsar, dropdown etc.) */}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
