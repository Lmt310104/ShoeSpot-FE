import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_URL } from "../../../utils/constant";
function ProductSearch({ item, onSearchResults, onSetPageSize }) {
  console.log(item);
  const [search, setSearch] = useState(""); // Giá trị nhập liệu
  const uniqueBrands = ["Adidas", "Nike", "Puma", "Jodan"];
  const [selectedBrand, setSelectedBrand] = useState("");
  const handleBrandChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedBrand(selectedValue);
    fetcApi(selectedValue);
  };
  // reset lại giao diện khi item thay đổi
  useEffect(() => {
    if (selectedBrand) {
      fetcApi(selectedBrand);
    } else if (search.trim()) {
      fetcApi(search);
    }
  }, [item]);
  const handleChange = (e) => {
    setSearch(e.target.value); // Cập nhật giá trị tìm kiếm
  };
  const fetcApi = (info) => {
    fetch(`${API_URL}/product/search?q=${info}&page=${1}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Không tìm thấy sản phẩm phù hợp."); // Xử lý lỗi HTTP
        }
        return res.json();
      })
      .then((data) => {
        if (!data.metadata || data.metadata.results.length === 0) {
          Swal.fire(
            "Thông báo",
            "Không có sản phẩm nào được tìm thấy.",
            "info"
          );
          onSearchResults([]); // Đặt danh sách rỗng
        } else {
          const totalPages = data.metadata.pagination.totalPages;
          onSetPageSize(totalPages);
          onSearchResults(data.metadata.results);
        }
      })
      .catch((err) => {
        Swal.fire("Lỗi", err.message, "error");
        onSearchResults([]); // Đặt lại danh sách sản phẩm
      });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      Swal.fire("Lỗi", "Vui lòng nhập từ khóa tìm kiếm.", "error");
      onSearchResults([]); // Reset kết quả tìm kiếm
      return;
    }
    fetcApi(search);
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
        <select value={selectedBrand} onChange={handleBrandChange}>
          <option value="">Lọc theo thương hiệu</option>
          {uniqueBrands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ProductSearch;
