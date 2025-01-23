import { api } from "../lib/api-client";

class OrderService {
  async getOrderById(orderId) {
    return api.get(`/order/get-one/${orderId}`);
  }
}

export default new OrderService();
