export default function PublicFooter() {
    return (
        <footer className="text-center py-3" style={{
            backgroundColor: "#2E4057",
            color: "#F5F5F5",
            borderTop: "2px solid #444444",
        }}>
            <small>© {new Date().getFullYear()} S&G Discos</small>
        </footer>
    );
}
