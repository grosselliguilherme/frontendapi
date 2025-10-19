"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {

    type User = {
        id: string;
        name: string;
        email: string;
        createdAt: string;
        password: string;
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    // lista de usuários
    const [users, setUsers] = useState<User[]>([]);

    //é executado na montagem da page / componente - carrega os usuários
    useEffect(() => {
        loadUsers();
    }, []);

    //monta o header com o token
    function getHeader() {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        };
    }

    // busca usuários
    async function loadUsers() {
        const resp = await fetch('http://localhost:3000/api/users', {
            headers: getHeader(),
            cache: 'no-store',
        });
        const data = await resp.json();
        setUsers(data);
    }

    //salvar um novo usuário a partir do form
    async function createUser(e: React.FormEvent) {
        e.preventDefault();

        await fetch('http://localhost:3000/api/users', {
            method: "POST",
            headers: getHeader(),
            body: JSON.stringify({ name, email, password }),
        });

        loadUsers()

        setName("");
        setEmail("");
        setPassword("");
    }

    // MODAL DE CONFIRMAÇÃO - remover usuário
    const [showConfirm, setConfirm] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    async function confirmDelete(id: string) {
        setIdDelete(id);
        setConfirm(true);
    }

    // EXCLUIR
    async function removeUser() {

        setConfirm(false);
        setIdDelete("");

        const resp = await fetch(`${'http://localhost:3000/api/users'}/${idDelete}`, {
            method: "DELETE",
            headers: getHeader(),
        });

        //recarrega a lista
        loadUsers()

    }

    // INICIAR EDIÇÃO
    function startEdit(u: User) {
        setEditingId(u.id);
        setName(u.name);
        setEmail(u.email);
        setPassword(u.password);
    }
    // SALVAR EDIÇÃO (PUT) - submit do form
    async function saveEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editingId) return;
        const resp = await fetch(`http://localhost:3000/api/users/${editingId}`, {
            method: "PUT",
            headers: getHeader(),
            body: JSON.stringify({ name, email }),
        });
        if (!resp.ok) {
            alert("Falha ao atualizar usuário");
            return;
        }
        const updated: User = await resp.json();
        setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        setEditingId(null);
        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <div className="container">
            <h2 className="my-4">Usuários</h2>
            <form onSubmit={editingId ? saveEdit : createUser} className="card p-3 mb-4">
                <div className="row">
                    <div className="col">
                        <label className="form-label">Nome</label>
                        <input
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite o nome"
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nome@exemplo.com"
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="*********"
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className={editingId ? "col-8" : "col-10"}></div>
                    <div className="col-2 mt-3">
                        <button className="btn btn-dark w-100" type="submit">
                            {editingId ? "Salvar" : "Adicionar"}
                        </button>
                    </div>
                    {editingId && (
                        <div className="col-2 mt-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary w-100"
                                onClick={() => {
                                    setEditingId(null);
                                    setName("");
                                    setEmail("");
                                }} >
                                Cancelar edição
                            </button>
                        </div>
                    )}
                </div>
            </form>


            {/* Tabela lista de usuários */}
            <div className="table-responsive">
                <table className="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Criado em</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.createdAt}</td>
                                    <td className="text-center">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => startEdit(u)}>
                                                Editar
                                            </button>
                                            <button onClick={() => confirmDelete(u.id)} className="btn btn-sm btn-danger mx-2">
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
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
                                <button type="button" className="btn-close" onClick={() => setConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                Tem certeza que deseja excluir o usuário?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setConfirm(false)}>
                                    Cancelar
                                </button>
                                <button className="btn btn-danger" onClick={removeUser}>
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
