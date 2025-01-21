import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "../lib/api-client";
import userService from "../services/user.service";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const { userId, role } = jwtDecode(token);
        return {
          userId: userId,
          role: role,
        };
      } catch (err) {
        console.log(err);
      }
    }
    return null;
  });

  const fetchUser = async (userId) => {
    try {
      const response = await userService.getAccountById(userId);
      console.log("Fetch user", response.data, userId);
      setUser({
        full_name: response.data.metadata.fullname,
        username: response.data.metadata.username,
        email: response.data.metadata.email,
        password: response.data.metadata.password,
        phone: response.data.metadata.phoneNumber,
        address: response.data.metadata.address,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.userId) {
      fetchUser(auth.userId);
    } else {
      setUser(null);
    }
  }, [auth]);

  const value = { auth, setAuth, user, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
