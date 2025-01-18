import { useState } from "react";
import ProductItem from "./ProductItem";
import Swal from "sweetalert2";

function ProductSearch() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(null); // Trạng thái lưu trữ sản phẩm

  const handleChange = (e) => {
    setSearch(e.target.value); // Cập nhật giá trị tìm kiếm
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      Swal.fire("Lỗi", "Vui lòng nhập từ khóa tìm kiếm.", "error");
      setProduct(null);
      return;
    }
    setProduct(null); // Xóa kết quả trước đó

    fetch(`http://localhost:3000/products/search?query=${encodeURIComponent(search)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không tìm thấy sản phẩm phù hợp."); // Xử lý lỗi HTTP
        }
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          Swal.fire("Thông báo", "Không có sản phẩm nào được tìm thấy.", "info");
          setProduct(null);
        } else {
          setProduct(data); // Lưu sản phẩm vào state
        }
      })
      .catch((err) => {
        Swal.fire("Lỗi", err.message, "error");
      });
  };

  return (
    <>
      <div className="product__search">
        <input
          type="text"
          className="product__input"
          placeholder="Tìm kiếm sản phẩm tại đây"
          value={search}
          onChange={handleChange}
          autoFocus
        />
        <button className="product__search-button" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>

      <div className="product__result">
        {product ? (
          <ProductItem item={product} /> // Hiển thị sản phẩm
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}

export default ProductSearch;
