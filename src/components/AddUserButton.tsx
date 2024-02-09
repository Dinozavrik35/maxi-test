import { FC, useState } from "react";
import { Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddUserForm from "./AddUserForm";

const AddUserButton: FC = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleModalCancel = () => setIsModalOpen(false);

    const handleModalOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="Add new user"
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <AddUserForm form={form} />
            </Modal>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                Add user
            </Button>
        </>
    );
};

export default AddUserButton;
