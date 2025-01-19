import { api } from "../lib/api-client";
class UserService {
  async getAccountById(id) {
    return api.get(`/users/get-one/${id}`);
  }
}
export default new UserService();
