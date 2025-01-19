import { Button, Checkbox, Form, Input } from "antd";
import Thumbnail from "../../assets/auth_2.jpg";

export default function SignUpPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center max-h-screen">
      <div className="flex flex-col flex-[5] justify-center px-[130px]">
        <h1 className="text-4xl font-bold mb-4 text-center text-[#ff3a34]">
          Sign up to ShoeSpot
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
            fontFamily: "Poppins",
            borderBottom: "1px solid #e5e5e5",
            marginBottom: "20px",
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
          <Form.Item
            label="Confirm password"
            name="confirmpassword"
            style={{
              fontFamily: "Poppins",
            }}
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Full name"
            name="fullname"
            style={{
              fontFamily: "Poppins",
            }}
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthday"
            rules={[
              {
                required: true,
                message: "Please input your birthday!",
              },
            ]}
          >
            <Input />
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
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <div className="text-right">
          <p>
            Already have an account?{" "}
            <a href="/auth/login" className="text-primary font-bold">
              Log in
            </a>
          </p>
        </div>
      </div>
      <div className="flex-[5]">
        <img src={Thumbnail} alt="login" />
      </div>
    </div>
  );
}
