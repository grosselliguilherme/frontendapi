export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
           

            {/* Área de conteúdo dos CRUDs */}
            <div className="flex-grow-1 d-flex flex-column">
                <main className="container py-4 flex-grow-1 overflow-auto">
                    {children}
                </main>
            </div>
        </>
    );
}
