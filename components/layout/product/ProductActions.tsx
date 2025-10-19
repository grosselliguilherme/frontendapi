import Link from "next/link";

export default function ProductActions() {
    return (
        <div className="d-flex gap-4">
            <Link href={``} className="btn btn-sm btn-outline-secondary">
                Ver detalhes
            </Link>
            <button className="btn btn-sm btn-dark">
                Adicionar
            </button>
        </div>
    );
}