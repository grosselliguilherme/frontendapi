"use client";

import { useEffect, useState } from "react";

export default function DiscsPage() {
    type Disc = {
        id: string;
        title: string;
        artist: string;
        price: number;
        stock: number;
        createdAt: string;
    };

    // States para o formulário
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [stock, setStock] = useState<number | "">("");
    const [editingId, setEditingId] = useState<string | null>(null);

    // Lista de discos
    const [discos, setDiscos] = useState<Disc[]>([]);

    // Modal de confirmação
    const [showConfirm, setConfirm] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    // Carregar discos na montagem
    useEffect(() => {
        loadDiscs();
    }, []);

    // Cabeçalho com token
    function getHeader() {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        };
    }

    // Buscar discos
    async function loadDiscs() {
        const resp = await fetch("http://localhost:3000/api/discs", {
            headers: getHeader(),
            cache: "no-store",
        });
        const data = await resp.json();
        if (Array.isArray(data)) setDiscos(data);
        else setDiscos([]);
    }

    // Criar disco
    async function createDisc(e: React.FormEvent) {
        e.preventDefault();

        await fetch("http://localhost:3000/api/discs", {
            method: "POST",
            headers: getHeader(),
            body: JSON.stringify({
                title,
                artist,
                price: Number(price),
                stock: Number(stock),
            }),
        });

        loadDiscs();
        setTitle("");
        setArtist("");
        setPrice("");
        setStock("");
    }

    // Iniciar edição
    function startEdit(d: Disc) {
        setEditingId(d.id);
        setTitle(d.title);
        setArtist(d.artist);
        setPrice(d.price);
        setStock(d.stock);
    }

    // Salvar edição
    async function saveEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editingId) return;

        const resp = await fetch(`http://localhost:3000/api/discs/${editingId}`, {
            method: "PUT",
            headers: getHeader(),
            body: JSON.stringify({
                title,
                artist,
                price: Number(price),
                stock: Number(stock),
            }),
        });

        if (!resp.ok) {
            alert("Falha ao atualizar disco");
            return;
        }

        const updated: Disc = await resp.json();
        setDiscos((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
        setEditingId(null);
        setTitle("");
        setArtist("");
        setPrice("");
        setStock("");
    }

    // Modal de confirmação - remover
    async function confirmDelete(id: string) {
        setIdDelete(id);
        setConfirm(true);
    }

    // Excluir disco
    async function removeDisc() {
        setConfirm(false);
        setIdDelete("");

        await fetch(`http://localhost:3000/api/discs/${idDelete}`, {
            method: "DELETE",
            headers: getHeader(),
        });

        loadDiscs();
    }

    return (
        <div className="container">
            <h2 className="my-4">Discos</h2>

            {/* Formulário de criação/edição */}
            <form onSubmit={editingId ? saveEdit : createDisc} className="card p-3 mb-4">
                <div className="row g-3">
                    <div className="col">
                        <label className="form-label">Título</label>
                        <input
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Digite o título"
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Artista</label>
                        <input
                            className="form-control"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            placeholder="Digite o artista"
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Preço</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="0.00"
                            min={0}
                            step={0.01}
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Estoque</label>
                        <input
                            type="number"
                            className="form-control"
                            value={stock}
                            onChange={(e) => setStock(Number(e.target.value))}
                            placeholder="0"
                            min={0}
                            required
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className={editingId ? "col-8" : "col-10"}></div>
                    <div className="col-2">
                        <button className="btn btn-dark w-100" type="submit">
                            {editingId ? "Salvar" : "Adicionar"}
                        </button>
                    </div>
                    {editingId && (
                        <div className="col-2">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
                                    setEditingId(null);
                                    setTitle("");
                                    setArtist("");
                                    setPrice("");
                                    setStock("");
                                }}
                            >
                                Cancelar edição
                            </button>
                        </div>
                    )}
                </div>
            </form>

            {/* Tabela lista de discos */}
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Artista</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Criado em</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discos.map((d) => (
                            <tr key={d.id}>
                                <td>{d.title}</td>
                                <td>{d.artist}</td>
                                <td>{d.price.toFixed(2)}</td>
                                <td>{d.stock}</td>
                                <td>{d.createdAt}</td>
                                <td className="text-center">
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => startEdit(d)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(d.id)}
                                            className="btn btn-sm btn-danger mx-2"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Confirmação */}
            {showConfirm && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,.5)" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar Exclusão</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setConfirm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Tem certeza que deseja excluir este disco?
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setConfirm(false)}
                                >
                                    Cancelar
                                </button>
                                <button className="btn btn-danger" onClick={removeDisc}>
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
