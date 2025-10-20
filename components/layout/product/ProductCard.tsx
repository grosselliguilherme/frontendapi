import ProductActions from "./ProductActions";

interface Disc {
    id: number;
    title: string;
    artist: string;
    price: number;
    image: string;
}

interface Props {
    disc: Disc;
}

export default function ProductCard({ disc }: Props) {
    return (
        <div
            className="card h-100 shadow-sm"
            style={{
                backgroundColor: "#2E4057",
                color: "#F5F5F5",
                border: "1px solid #444444",
                borderRadius: "10px",
            }}
        >
            <img
                src={disc.image}
                alt={disc.title}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // centraliza e corta bordas
                }}
            />
            <div className="card-body d-flex flex-column">
                <h5>{disc.title}</h5>
                <p className="text-secondary">{disc.artist}</p>
                <p className="fw-bold">R$ {disc.price.toFixed(2)}</p>
                <div className="mt-auto d-flex justify-content-end">
                    <ProductActions />
                </div>
            </div>
        </div>
    );
}
