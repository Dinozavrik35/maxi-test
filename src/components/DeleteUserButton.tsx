import { FC } from "react";
import { Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { deleteUsers } from "../services/api/userApi";

const DeleteUserButton: FC = () => {
    const dispatch = useAppDispatch();
    const [modal, contextHolder] = Modal.useModal();
    const { selectedRows } = useAppSelector((state) => state.user);

    const handleDelete = () => {
        dispatch(deleteUsers(selectedRows));
    }

    const confirm = () => {
        modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: `Are you sure you want to delete user${
                selectedRows.length > 1 ? "s" : ""
            } ${selectedRows.join(", ")}?`,
            okText: "Удалить",
            cancelText: "Отмена",
            onOk: handleDelete,
        });
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" danger onClick={confirm}>
                Delete
            </Button>
        </>
    );
};

export default DeleteUserButton;
