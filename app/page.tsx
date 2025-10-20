import ProductCard from "@/components/layout/product/ProductCard";

export default function Home() {
    const products = [
        { id: 1, title: "Cançoes do Bosque Enacntado", artist: "Ursinhos Amiguinhos", price: 59.9, image: "/images/bosque.png" },
        { id: 2, title: "Kaleido Remixes", artist: "DJ Pulse", price: 69.9, image: "/images/eletro.png" },
        { id: 3, title: "Eu Te Amo", artist: "Juca", price: 49.9, image: "/images/ily.png" },
        { id: 4, title: "Volume II", artist: "Neon Echoes - A Série", price: 79.9, image: "/images/ost.png" },
        { id: 5, title: "Peace - Lofi Sounds", artist: "The Relax Group", price: 39.9, image: "/images/peace.png" },
        { id: 6, title: "Stars", artist: "IYKYK", price: 89.9, image: "/images/stars.png" },
    ];

    return (
        <>
            <section className="py-4 text-center">
                <h3>Produtos em destaque</h3>
            </section>

            <section>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {products.map((product) => (
                            <div className="col" key={product.id}>
                                <ProductCard disc={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}