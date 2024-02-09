import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Form, Input } from "antd";
import { MaskedInput } from "antd-mask-input";
import { FormInstance } from "antd/lib";
import { useAppDispatch } from "../hooks/reduxHooks";
import { UserListItem } from "../store/slices/userSlice";
import { addUser, useGetUserListQuery } from "../services/api/userApi";

const AddUserForm: FC<{ form: FormInstance }> = ({ form }) => {
    const { data: userList = [] } = useGetUserListQuery();
    const dispatch = useAppDispatch();

    const addUserFormSubmit = (newUser: UserListItem) => {
        newUser.id = userList[userList.length - 1]
            ? userList[userList.length - 1].id + 1
            : 0;
        newUser.key = String(newUser.id);
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
                rules={[
                    {
                        required: true,
                        message: "Please input your name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
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
                label="E-mail"
                name="email"
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
                <Input type="number" />
            </Form.Item>
        </Form>
    );
};

export default AddUserForm;
