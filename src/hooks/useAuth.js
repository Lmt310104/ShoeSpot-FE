import { AuthContext } from "../context/auth";
import { useContext } from "react";

export default function useAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { auth, setAuth } = authContext;
  return [auth, setAuth];
}
