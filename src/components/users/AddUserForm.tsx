import { FC } from "react";
import { Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { FormInstance } from "antd/lib";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { UserListItem, addUser } from "../../services/api/userApi";


const AddUserForm: FC<{ form: FormInstance }> = ({ form }) => {
    const dispatch = useAppDispatch();

    const addUserFormSubmit = (newUser: UserListItem) => {
        dispatch(addUser(newUser));
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="addUser"
            autoComplete="off"
            layout="vertical"
            onFinish={addUserFormSubmit}
        >
            <Form.Item
                label="Name"
                name="name"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: "Please input your name!",
                    },
                    {
                        min: 2,
                        max: 50,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                    {
                        min: 2,
                        max: 30,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="E-mail"
                name="email"
                validateTrigger="onBlur"
                rules={[
                    {
                        type: "email",
                        message: "The input is not valid e-mail!",
                    },
                    {
                        required: true,
                        message: "Please input your e-mail!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                validateTrigger="onBlur"
                rules={[
                    {
                        required: true,
                        message: "Please input your phone!",
                    },
                    {
                        pattern: new RegExp(/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/g),
                        message: "The input is not valid phone!",
                    },
                ]}
            >
                <MaskedInput mask={"+7 000 000-00-00"} />
            </Form.Item>

            <Form.Item
                label="ZIP Code"
                name="zipcode"
                validateTrigger="onBlur"
                rules={[
                    {
                        min: 5,
                        max: 15,
                    },
                ]}
            >
                <MaskedInput mask={/^\d+-?\d*$/} />
            </Form.Item>
        </Form>
    );
};

export default AddUserForm;
