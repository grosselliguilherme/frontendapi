import ProductCard from "@/components/layout/product/ProductCard";

export default function Home() {
    return (
        <>
            <section className="py-4 text-center">
                <h3>Produtos em destaque</h3>
            </section>
            <section>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <ProductCard />
                        </div>
                        <div className="col">
                            <ProductCard />
                        </div>
                        <div className="col">
                            <ProductCard />
                        </div>
                        <div className="col">
                            <ProductCard />
                        </div>
                        <div className="col">
                            <ProductCard />
                        </div>
                        <div className="col">
                            <ProductCard />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}