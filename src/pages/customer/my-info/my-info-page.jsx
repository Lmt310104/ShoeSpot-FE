import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import userService from "../../../services/user.service";
import useUser from "../../../hooks/useUser";

export default function MyInfoPage() {
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [user, setUser] = useUser();
  const [form] = Form.useForm();
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullname: user.full_name,
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);
  console.log("user", user);
  const onFinish = async (values) => {
    try {
      setIsEditInfo(false);
      await userService.updateUserInfo(values);
      toast.success("Edit info successfully");
    } catch (err) {
      console.log(err);
      toast.error("Edit info failed: " + err.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.error("Form validation failed:", errorInfo);
    toast.error("Please check your inputs and try again");
  };
  return (
    <>
      {user ? (
        <>
          <Header />
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
                  rules={[{ required: true }]}
                >
                  <Input disabled={!isEditInfo} />
                </Form.Item>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true }]}
                >
                  <Input disabled={!isEditInfo} />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                >
                  <Input disabled={!isEditInfo} />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true }]}
                >
                  <Input disabled={!isEditInfo} />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true }]}
                >
                  <Input disabled={!isEditInfo} />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true }]}
                >
                  <Input disabled={!isEditInfo} />
                </Form.Item>
                {isEditInfo ? (
                  <Form.Item label=" ">
                    <Button
                      type="primary"
                      htmlType="submit"
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
                        e.preventDefault(), setIsEditInfo(true);
                      }}
                    >
                      Edit Info
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
