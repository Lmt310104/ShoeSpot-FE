import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import useUser from "../hooks/useUser";
import { TiShoppingCart } from "react-icons/ti";
import authService from "../services/auth.service";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { removeAccessToken } from "../lib/api-client";
import { Button } from "antd";

export default function Header() {
  const [user, setUser] = useUser();
  const [auth, setAuth] = useAuth();
  console.log(user, auth);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await authService.logOut();
      toast.success("Đăng xuất thành công");
      if (response) {
        setAuth(null);
        setUser(null);
        removeAccessToken();
        navigate("/auth/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header className="px-[130px] py-[10px] flex justify-between bg-[#e5e7eb]">
      <div className="flex justify-center items-center gap-10">
        <img src={Logo} className="h-[80px] w-[80px] rounded " />
        <p className="font-bold text-2xl text-[#ffa500]">ShoeSpot</p>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div>
          <Link to="/cart">
            <TiShoppingCart size={30} />
          </Link>
        </div>
        {!auth ? (
          <nav>
            <ul className="flex justify-center items-center gap-10">
              <li>
                <Link
                  to="/auth/login"
                  style={{ fontFamily: "Poppins", textDecoration: "none" }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signup"
                  style={{ fontFamily: "Poppins", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul className="flex justify-center items-center gap-10">
              <li>
                <Link
                  to="/app/member/my-info"
                  style={{ fontFamily: "Poppins", textDecoration: "none" }}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Button
                  style={{ border: 0, fontFamily: "Poppins" }}
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
