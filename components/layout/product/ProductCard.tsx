import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";

export default function ProductCard() {
    return (
        <div className="card h-100 shadow-sm" style={{
            backgroundColor: "#2E4057",
            color: "#F5F5F5",
            border: "1px solid #444444",
            borderRadius: "10px",
        }}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi_0emP7ZUgoNXMPHaKiFNGoS21lO2bh9l1g&s" alt="Caneca dev" className="card-img-top" style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                borderBottom: "1px solid #D72638",
            }} />
            <div className="card-body d-flex flex-column">
                <ProductInfo />
                <div className="mt-auto d-flex justify-content-end">
                    <ProductActions />
                </div>
            </div>
        </div>
    );
}
