import { FC, memo, useEffect, useRef, useState } from "react";
import { App, Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddUserForm from "./AddUserForm";


const AddUserButton: FC<{ disabled: boolean }> = memo(({ disabled }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { notification } = App.useApp();
    const addButtonRef = useRef(null);

    const showModal = () => setIsModalOpen(true);
    const handleModalCancel = () => setIsModalOpen(false);

    const handleModalOk = async () => {
        try {
            await form.validateFields();
            form.submit();
            setIsModalOpen(false);
            notification["success"]({
                message: "Added successfully",
                duration: 3,
            });
        } catch (err) {}
    };

    const handleEnterPress = (e: KeyboardEvent) => {
        if (
            e.target !== addButtonRef.current &&
            e.key === "Enter" &&
            isModalOpen
        ) {
            handleModalOk();
        }
    };

    useEffect(() => {
        window.addEventListener("keyup", handleEnterPress);

        return () => {
            window.removeEventListener("keyup", handleEnterPress);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isModalOpen]);

    return (
        <>
            <Modal
                title="Add new user"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText="Add"
            >
                <AddUserForm form={form} />
            </Modal>
            <Button
                ref={addButtonRef}
                type="primary"
                onClick={showModal}
                icon={<PlusOutlined />}
                disabled={disabled}
            >
                Add user
            </Button>
        </>
    );
});


export default AddUserButton;
