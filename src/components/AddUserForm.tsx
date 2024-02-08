import { FC } from "react";
import { Form, Input, FormInstance } from "antd";
import { MaskedInput } from "antd-mask-input";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { UserListItem, addUser } from "../store/slices/userSlice";


const AddUserForm: FC<{ form?: FormInstance }> = ({ form }) => {
    const dispatch = useAppDispatch();
    const lastUserId = useAppSelector((state) => state.user[state.user.length - 1].id);

    const onFinish = (newUser: UserListItem) => {
        newUser.id = lastUserId + 1;
        newUser.key = String(newUser.id);
        dispatch(addUser(newUser));
        form?.resetFields();
    };

    const onFinishFailed = () => {};

    return (
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone!",
                    },
                    {
                        pattern: new RegExp(/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/g),
                        message: "The input is not valid Phone!",
                    },
                ]}
            >
                <MaskedInput mask={"+7 000 000-00-00"} />
            </Form.Item>

            <Form.Item label="Zipcode" name="zipcode">
                <Input />
            </Form.Item>
        </Form>
    );
};

export default AddUserForm;
