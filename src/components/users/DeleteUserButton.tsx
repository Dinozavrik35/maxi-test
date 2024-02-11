import { FC } from "react";
import { App, Button, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteUsers } from "../../services/api/userApi";
import { setSelectedRows } from "../../store/slices/usersSlice";


const DeleteUserButton: FC = () => {
    const { selectedRows } = useAppSelector((state) => state.users);
    const [modal, contextHolder] = Modal.useModal();
    const { notification } = App.useApp();
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteUsers(selectedRows));
        dispatch(setSelectedRows([]));
        notification["success"]({
            message: "Deleted successfully",
            duration: 3,
        });
    };

    const confirmDelete = () => {
        modal.confirm({
            title: "Confirm",
            icon: <ExclamationCircleOutlined />,
            content: `Are you sure you want to delete user${
                selectedRows.length > 1 ? "s" : ""
            } ${selectedRows.join(", ")}?`,
            okText: "Delete",
            cancelText: "Cancel",
            onOk: handleDelete,
        });
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" danger onClick={confirmDelete}>
                Delete
            </Button>
        </>
    );
};

export default DeleteUserButton;
