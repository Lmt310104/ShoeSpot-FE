import { useEffect, useState } from "react";
import userService from "../../../services/user.service";

export default function PurchaseHistoryPage() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        setIsLoading(true);
        const response = await userService.getPurchaseHistory();
        console.log("response", response);
        if (response.data) {
          setPurchaseHistory(response.data.metadata || []);
        } else {
          setError(response.message || "Failed to fetch purchase history");
        }
      } catch (err) {
        setError("An error occurred while fetching purchase history");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (purchaseHistory.length === 0) return <div>No purchase history found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Order History</h1>
      {purchaseHistory.map((purchase) => (
        <div
          key={purchase._id}
          className="border rounded-lg p-4 mb-4 shadow-sm"
        >
          <div className="flex justify-between mb-4">
            <p>Order ID: {purchase._id}</p>
            <p>Date: {new Date(purchase.createdAt).toLocaleDateString("vi")}</p>
            <p className="font-bold text-red-500">
              Total: {purchase.order_totalPrice}đ
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {purchase.items.map((orderItem) => (
              <div
                key={orderItem._id}
                className="flex items-center border p-2 rounded"
              >
                <img
                  src={orderItem.thumbnail}
                  alt={orderItem.name}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{orderItem.name}</h3>
                  <p className="font-bold">Price: {orderItem.price} đ</p>
                  <p>Quantity: {orderItem.quantity}</p>
                  <p>Size: {orderItem.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
