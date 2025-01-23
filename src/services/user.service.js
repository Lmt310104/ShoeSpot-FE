import { api } from "../lib/api-client";
class UserService {
  async getAccountById() {
    return api.get(`/user/get-one`);
  }
  async updateUserInfo(data) {
    return api.patch(`/user/update`, data);
  }
}
export default new UserService();
