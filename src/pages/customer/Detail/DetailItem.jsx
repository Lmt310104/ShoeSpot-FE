import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import "./detail.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../../utils/constant";
import { getAccessToken } from "../../../lib/api-client";
import useAuth from "../../../hooks/useAuth";
import ProductItem from "../../../components/layouts/Product/ProductItem";
function DetailItem({ detail }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sameProduct, setSameProduct] = useState([]);
  const [auth, setAuth] = useAuth();
  const token = getAccessToken();
  console.log(detail._id);
  const handleSize = (index) => {
    setSelectedSize(index);
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue === "" || (Number(newValue) >= 1 && Number(newValue) <= 100)) {
      setQuantity(newValue === "" ? "" : Number(newValue));
    }
  };

  const handleBlur = () => {
    if (quantity === "" || quantity < 1) {
      setQuantity(1);
    }
  };
  // api sản phẩm tương tự
  useEffect(() => {
    const fetchProductSame = async () => {
      const response = await fetch(
        `${API_URL}/product/related-products?brand=${detail.product_brand}`
      );
      if (!response.ok) {
        throw new Error("Không tìm thấy sản phẩm"); // Xử lý lỗi HTTP
      }
      const data = await response.json();
      setSameProduct(data.metadata); // Lưu chi tiết sản phẩm
    };
    fetchProductSame();
  }, [detail.product_brand]);
  const handlePlus = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < 100 ? prevQuantity + 1 : 100
    );
  };

  const handleMinus = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const postCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: `${token}`,
          "x-client-id": auth.userId,
        },
        body: JSON.stringify({
          product: {
            productId: detail._id,
            quantity: quantity,
            size: selectedSize,
          },
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Thêm sản phẩm vào giỏ hàng thành công",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(data.message || "Đã xảy ra lỗi khi thêm sản phẩm!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message || "Không thể thêm sản phẩm vào giỏ hàng!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCart = () => {
    if (selectedSize === null) {
      Swal.fire({
        icon: "warning",
        title: "Vui lòng chọn size trước khi thêm vào giỏ hàng!",
      });
      return;
    }
    postCart();
  };
  //Image
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false); // Tắt modal
  };
  console.log(detail.product_stock)
  // Modal
  return (
    <>
      <div className="detail">
        <div className="detail__image" onClick={openModal}>
          <img src={detail.product_thumbnails} alt={detail.product_name} />
        </div>
        {isModalOpen && (
          <div className="detail__modal">
            <span className="detail__close" onClick={closeModal}>
              &times;
            </span>
            <img src={detail.product_thumbnails} />
          </div>
        )}
        <div className="detail__info">
          <div className="detail__name">{detail.product_name}</div>
          <div className="detail__description">
            <div>{detail.product_description}</div>
            <div className="detail__brand">Thương hiệu: {detail.product_brand}</div>
          </div>
          <div className="detail__price">₫{detail.product_price}</div>
          <div>
          Tổng kho: 
              
                 {detail.product_stock}

            </div>
          <div className="detail__buy">
            <div>
              <div className="detail__size-title">Size giày</div>
              {detail.product_sizes?.map((item, index) => (
                <button
                  key={index}
                  className={`detail__size ${
                    selectedSize === item ? "detail__choose" : ""
                  }`}
                  onClick={() => handleSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="detail__stock">
              <span>Số lượng </span>
              <div className="detail__stock-buy">
                <button
                  className="button-2"
                  onClick={handleMinus}
                  disabled={isLoading}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  max="100"
                  disabled={isLoading}
                />
                <button
                  className="button-2"
                  onClick={handlePlus}
                  disabled={isLoading}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            className="detail__button"
            onClick={handleCart}
            disabled={isLoading}
          >
            {isLoading ? "Đang thêm..." : "Thêm vào giỏ hàng"} <IoCartOutline />
          </button>
        </div>
      </div>
      <div className="detail_product">
        <h2 className="product__same">SẢN PHẨM TƯƠNG TỰ</h2>
        <div className="product">
          {sameProduct.map((item) => (
            <ProductItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default DetailItem;
