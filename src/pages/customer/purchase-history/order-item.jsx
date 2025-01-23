import { useEffect, useState } from "react";
import orderService from "../../../services/order.service";

export default function OrderItem({ orderItemId }) {
  const [orderItem, setOrderItem] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrderItem = async () => {
      setLoading(true);
      const response = await orderService.getOrderItemById(orderItemId);
      if (response.data) {
        setOrderItem({});
      }
      setLoading(false);
    };
    fetchOrderItem();
  }, [orderItemId]);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="flex">
          <img src={orderItem.product?.image} alt={orderItem.product?.name} />
          <div>
            <h3>{orderItem.product?.name}</h3>
            <p>{orderItem.product?.description}</p>
            <p>{orderItem.product?.price}</p>
          </div>
        </div>
      )}
    </>
  );
}
