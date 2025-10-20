"use client";

import { useEffect, useState } from "react";

interface Disc {
    id: number;
    title: string;
    artist: string;
    price: number;
    stock: number;
    createdAt: string;
}

export default function DiscsPage() {
    const [discs, setDiscs] = useState<Disc[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDiscs() {
            try {
                const resp = await fetch("http://localhost:3000/discs");
                if (!resp.ok) {
                    throw new Error(`Erro ao buscar discos: ${resp.status}`);
                }
                const data = await resp.json();
                setDiscs(data);
            } catch (err: any) {
                setError(err.message || "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        fetchDiscs();
    }, []);

    if (loading) return <div className="container py-5 text-light">Carregando discos...</div>;
    if (error) return <div className="container py-5 alert alert-danger">{error}</div>;

    return (
        <div className="container py-5" style={{ maxWidth: 960 }}>
            <h1 className="mb-4 text-light">Discos Disponíveis</h1>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {discs.map((disc) => (
                    <div key={disc.id} className="col">
                        <div className="card h-100 shadow-sm" style={{ backgroundColor: "#121212", color: "#F5F5F5" }}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{disc.title}</h5>
                                <p className="card-text mb-1">Artista: {disc.artist}</p>
                                <p className="card-text mb-1">Estoque: {disc.stock}</p>
                                <p className="card-text fw-bold mb-2" style={{ color: "#D72638" }}>
                                    R$ {disc.price.toFixed(2)}
                                </p>
                                <div className="mt-auto d-flex justify-content-end gap-2">
                                    <button className="btn btn-outline-warning btn-sm">Ver detalhes</button>
                                    <button className="btn btn-secondary btn-sm">Adicionar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
