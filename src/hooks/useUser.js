import { AuthContext } from "../context/auth";
import { useContext } from "react";

export default function useUser() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user, setUser } = authContext;
  return [user, setUser];
}
