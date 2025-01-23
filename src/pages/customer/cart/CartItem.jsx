import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../../../utils/constant";
import { getAccessToken } from "../../../lib/api-client";
import useAuth from "../../../hooks/useAuth";

function CartItem({ item, triggerReload }) {
  const token = getAccessToken();
  const [auth, setAuth] = useAuth();
  const handlePlus = () => {
    fetch(`${API_URL}/cart/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `${token}`,
        "x-client-id": auth.userId,
      },
      body: JSON.stringify({
        products: [
          {
            productId: item.productId,
            quantity: item.quantity + 1,
            size: item.size,
          },
        ],
      }),
    }).then(() => {
      triggerReload(); // Kích hoạt tải lại
    });
  };

  const handleExcept = () => {
    fetch(`${API_URL}/cart/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `${token}`,
        "x-client-id": auth.userId,
      },
      body: JSON.stringify({
        products: [
          {
            productId: item.productId,
            quantity: item.quantity - 1,
            size: item.size,
          },
        ],
      }),
    }).then(() => {
      triggerReload(); // Kích hoạt tải lại
    });
  };

  const handleDelete = () => {
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
          fetch(`${API_URL}/cart`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: `${token}`,
              "x-client-id": auth.userId,
            },
            body: JSON.stringify({
              product: {
                productId: item.productId,
                size: item.size,
              },
            }),
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
  console.log(item);
  return (
    <>
      <div className="cart__item">
        <div className="cart__image">
          <img src={item.thumbnail} alt={item.name} />
        </div>
        <div className="cart__content">
          <div className="cart__name">Tên sản phẩm: {item.name}</div>
          <div className="cart__size">Size: {item.size}</div>
          <div className="cart__price">
          Đơn giá: 
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(item.price)}
          </div>
          <div className="cart__quantity">
          Số lượng:
            <button className="button-2" onClick={handleExcept}>
              -
            </button>
            <input type="number" min="1" value={item.quantity} readOnly />
            <button className="button-2" onClick={handlePlus}>
              +
            </button>
          </div>
          <button className="cart__delete" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
