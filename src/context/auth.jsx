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
        const { id, role } = jwtDecode(token);
        return {
          userId: id,
          role: role,
        };
      } catch (err) {
        console.log(err);
      }
    }
    return null;
  });

  const fetchUser = async (id) => {
    try {
      const response = await userService.getAccountById(id);
      setUser({
        full_name: response.data.data.full_name,
        avatar_url: response.data.data.avatar_url,
        email: response.data.data.email,
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
