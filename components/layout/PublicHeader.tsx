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
        <nav className="navbar navbar-expand-md shadow-sm" style={{ backgroundColor: "#2E4057", borderBottom: "2px solid #D72638", }}>
            <div className="container d-flex align-items-center justify-content-between">
                <Link href="/" className="navbar-brand" style={{ color: "#FFC857", fontWeight: "bold", letterSpacing: "1px" }}>
                    S&G DISCOS
                </Link>

                {!logged ? (
                    <div className="d-flex gap-2">
                        <Link href="/login" className="btn btn-sm" style={{ color: "#F5F5F5", border: "1px solid #FFC857", }}>
                            Login
                        </Link>
                        <Link href="/cadastro" className="btn btn-sm" style={{ backgroundColor: "#D72638", color: "#F5F5F5", border: "1px solid #D72638", }}>
                            Cadastre-se
                        </Link>
                    </div>
                ) : pathname?.startsWith("/dashboard") ? (
                    <button onClick={logout} className="btn btn-sm" style={{ color: "#F5F5F5", border: "1px solid #FFC857", }}>
                        Sair
                    </button>
                ) : (
                    <button onClick={entrar} className="btn btn-sm" style={{ backgroundColor: "#D72638", color: "#F5F5F5", border: "1px solid #D72638", }}>
                        Entrar
                    </button>
                )}
            </div>
        </nav>
    );
}