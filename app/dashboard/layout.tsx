"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const hasToken = localStorage.getItem("auth_token") != null;
    if (!hasToken) router.replace("/login");
  }, [router]);

  return <>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/dashboard">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard/users">Users</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard/profiles">Profiles</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {children}

  </>;
}
