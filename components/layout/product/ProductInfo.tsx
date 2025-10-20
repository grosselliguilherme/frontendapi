import Link from "next/link";

export default function ProductInfo() {
    return (
        <>
            <h5 className="card-title mb-1">
                <Link href={``} className="text-decoration-none" style={{ color: "#FFC857" }}>
                    Caneca Dev
                </Link>
            </h5>
            <p className="card-text small mb-2" style={{ color: "#DFF9FB" }}>Caneca para café, ideal para programar</p>
            <p className="fw-bold mb-0" style={{ color: "#D72638" }}>R$ 39,90</p>
        </>
    );
}