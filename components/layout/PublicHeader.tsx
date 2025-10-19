"use client";

import { clearToken, isAuthenticated } from "@/app/lib/auth_helper";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PublicHeader() {

    const pathname = usePathname();
    const [logged, setLogged] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        setLogged(isAuthenticated());
    }, [pathname]);

    if (logged === null) return null;

    function logout() {
        clearToken();
        setLogged(false);
        router.push("/");
    };
    
    function entrar() {
        router.push("/dashboard")
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex align-items-center">
                <Link href="/" className="navbar-brand">Loja Exemplo</Link>
                {!logged ? (
                    <div className="d-flex gap-2">
                        <Link href="/login" className="btn btn-outline-light btn-sm">Login</Link>
                        <Link href="/cadastro" className="btn btn-warning btn-sm">Cadastre-se</Link>
                    </div>
                ) : (
                    <>
                        {pathname?.startsWith("/dashboard") ? (
                            <>
                                <button onClick={logout} className="btn btn-outline-light btn-sm">
                                    Sair
                                </button>
                            </>
                        ) : (
                            <button onClick={entrar} className="btn btn-outline-light btn-sm">
                                Entrar
                            </button>
                        )}
                        { }
                    </>)}
            </div>
        </nav>
    );
}