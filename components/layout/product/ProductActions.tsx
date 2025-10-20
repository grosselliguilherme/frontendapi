import Link from "next/link";

export default function ProductActions() {
    return (
        <div className="d-flex gap-4">
            <Link href={``} className="btn btn-sm" style={{
                border: "1px solid #FFC857",
                color: "#FFC857",
                backgroundColor: "transparent",
            }}>
                Ver detalhes
            </Link>
            <button className="btn btn-sm" style={{
                backgroundColor: "#D72638",
                color: "#F5F5F5",
                border: "1px solid #D72638",
            }}>
                Adicionar
            </button>
        </div>
    );
}