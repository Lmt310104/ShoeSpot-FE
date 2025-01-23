import CartItem from "./CartItem";
import "./Cart.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { API_URL } from "../../../utils/constant";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import { getAccessToken } from "../../../lib/api-client";
function Cart() {
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [auth, setAuth] = useAuth();
  const token = getAccessToken();
  const triggerReload = () => {
    setReload((prev) => !prev); // Đảo giá trị để kích hoạt useEffect
  };
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${API_URL}/cart?userId=${auth.userId}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `${token}`,
            "x-client-id": auth.userId,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setCart(data.metadata.cart_products);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải dữ liệu giỏ hàng!",
        });
      }
    };

    fetchCart();
  }, [reload]);
  const total = cart.reduce((sum, item) => {
    const priceNew = item.price;
    return sum + priceNew * item.quantity;
  }, 0);
  const handelDeleteAll = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${API_URL}/cart/clear`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: `${token}`,
              "x-client-id": auth.userId,
            },
          })
            .then((response) => response.json())
            .then(() => {
              swalWithBootstrapButtons.fire(
                "Deleted!",
                "Your item has been deleted.",
                "success"
              );
              triggerReload(); // Kích hoạt tải lại
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire(
                "Error",
                "Failed to delete item!",
                "error"
              );
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your item is safe :)",
            "error"
          );
        }
      });
  };
  console.log(cart.length);
  return (
    <>
      <div className="cart">
        {cart.length ? (
          <>
            <div className="cart__title">
              <div className="cart__title-image">Hình ảnh</div>
              <div className="cart__title-name">Tên sản phẩm</div>
              <div className="cart__title-size">Size</div>
              <div className="cart__title-price">Giá</div>
              <div className="cart__title-quantity">Số lượng</div>
            </div>
            {cart.map((item) => (
              <CartItem
                item={item}
                key={item._id}
                triggerReload={triggerReload}
              />
            ))}
            <button className="cart__delete-all" onClick={handelDeleteAll}>
              Xóa tất cả
            </button>
            <div className="cart__total">
              <div>
                Tổng tiền: <span>{total}</span>
              </div>
            </div>
            <button className="cart__buy">Thanh toán</button>
          </>
        ) : (
          <div>Không có sản phẩm nào</div>
        )}
      </div>
    </>
  );
}
export default Cart;
