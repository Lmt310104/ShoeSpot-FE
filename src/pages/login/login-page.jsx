import { Button, Checkbox, Form, Input } from "antd";
import Thumbnail from "../../assets/thumbnail_auth.jpg";
import { toast } from "react-toastify";
import authService from "../../services/auth.service";
import { setAccessToken } from "../../lib/api-client";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [setAuth] = useAuth();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await authService.login(values);
      if (response.data) {
        const accessToken = response.data.access_token;
        setAccessToken(accessToken);
        const { id, role } = jwtDecode(accessToken);

        setAuth({
          userId: id,
          role,
        });
        toast.success("Đăng nhập thành công");
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
      console.error("Login error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form validation failed:", errorInfo);
    toast.error("Please check your inputs and try again");
  };

  return (
    <div className="flex justify-center">
      <div className="flex-[6]">
        <img src={Thumbnail} alt="login" />
      </div>
      <div className="flex flex-col flex-[4] justify-center px-[130px]">
        <h1 className="text-4xl font-bold mb-4 text-center text-[#ff3a34]">
          Log in to ShoeSpot
        </h1>
        <p className="text-center mb-[40px]">Enter your details below</p>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            style={{
              fontFamily: "Poppins",
            }}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              block
              styles={{ height: "50px", fontFamily: "Poppins" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <div className="underline mb-4 text-right border-b-[1px] pb-[10px]">
          <a href="/auth/forgot-password" className="text-primary">
            Forgot password?
          </a>
        </div>
        <div className="text-right">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/auth/signup" className="text-primary font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
