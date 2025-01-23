import { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { toast } from "react-toastify";
import userService from "../../../services/user.service";
import useUser from "../../../hooks/useUser";

export default function MyInfoPage() {
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useUser();
  console.log(user);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullname: user.full_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await userService.updateUserInfo(values);
      setUser({ ...user, ...values });
      toast.success("Edit info successfully");
      setIsEditInfo(false);
    } catch (err) {
      console.error(err);
      toast.error("Edit info failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Form validation failed:", errorInfo);
    toast.error("Please check your inputs and try again");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="px-[130px] flex flex-col items-center">
      <h1 className="font-bold text-4xl mt-[50px]">My Info</h1>
      <div className="mt-[50px]">
        <Form
          form={form}
          name="wrap"
          labelCol={{ flex: "110px" }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{
            minWidth: "800px",
            width: "100%",
            fontFamily: "Poppins",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Full name"
            name="fullname"
            rules={[{ required: true, message: "Full name is required" }]}
          >
            <Input disabled={!isEditInfo} />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input disabled={!isEditInfo} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Invalid email address" },
            ]}
          >
            <Input disabled={!isEditInfo} />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Phone is required" },
              { pattern: /^[0-9]+$/, message: "Invalid phone number" },
            ]}
          >
            <Input disabled={!isEditInfo} />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Address is required" }]}
          >
            <Input disabled={!isEditInfo} />
          </Form.Item>
          {isEditInfo ? (
            <Form.Item label=" ">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading} // Disable khi đang submit
                style={{ width: "100%", backgroundColor: "#ff3a34" }}
              >
                Submit
              </Button>
            </Form.Item>
          ) : (
            <Form.Item label=" ">
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditInfo(true);
                }}
              >
                Edit Info
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
}
