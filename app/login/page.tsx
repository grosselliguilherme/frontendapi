/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    try {
      const resp = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 'email': email, 'password': password }),
      });

      if (!resp.ok) {
        throw new Error(`Login falhou (${resp.status})`);
      }

      const data = await resp.json();
      if (!data?.access_token) {
        throw new Error("Resposta sem token");
      }
      
      localStorage.setItem("auth_token", data.access_token);
      
      router.push("/dashboard");
    } catch (err: any) {
      setErro(err?.message || "Erro inesperado");
    } 
  }

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h1 className="mb-3">Login</h1>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form onSubmit={handleSubmit} className="card p-3">
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nome@exemplo.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button className="btn btn-dark" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}*/
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  var email: any;
  var password: any;

  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter();

  async function submitForm(e: any) {
    e.preventDefault();
    setErro(null);

    const resp = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 'email': email, 'password': password }),
    });

    if (!resp.ok) {
      setErro(`Login falhou (${resp.status})`);
      return;
    }

    const data = await resp.json();
    if (!data?.access_token) {
      setErro("Resposta sem token");
      return;
    }

    localStorage.setItem("auth_token", data.access_token);
    router.push("/dashboard");
  }

   return (
    <div className="container py-5" style={{ maxWidth: 420 }}>

      <h1 className="mb-3">Login</h1>

      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={submitForm} className="card p-3">
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => email = (e.target.value)}
            placeholder="nome@exemplo.com"
            required />
        </div>


        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => password = (e.target.value)}
            placeholder="••••••••"
            required />
        </div>


        <button className="btn btn-dark" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
