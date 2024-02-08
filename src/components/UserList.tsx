import { FC, useEffect, useState } from "react";
import { Form, Modal, Table, TableColumnsType } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useGetUserListQuery } from "../services/api/userApi";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
    setUserList,
    deleteUser,
    UserListItem,
} from "../store/slices/userSlice";
import AddUserForm from "./AddUserForm";

const columns: TableColumnsType<UserListItem> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: "Photo",
        dataIndex: "name",
        key: "photo",
        render: (name) => (
            <span
                style={{
                    color: "white",
                    backgroundColor: "darkgreen",
                    width: "35px",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center',
                    aspectRatio: '1 / 1',
                    padding: '10px',
                    borderRadius: '50%',
                    fontWeight: 'bold',
                    boxSizing: 'border-box'
                }}
            >
                {name.toUpperCase()[0]}
            </span>
        ),
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone ",
    },
    {
        title: "Zipcode",
        dataIndex: "zipcode",
        key: "zipcode ",
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
];

const UserList: FC = () => {
    const dispatch = useAppDispatch();
    const userList = useAppSelector((state) => state.user);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const { data, error, isLoading } = useGetUserListQuery();

    const [filterField, setFilterField] = useState<"name" | "email" | "phone">(
        "name"
    );
    const [filterVal, setFilterVal] = useState<string>("");

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        if (data) {
            const modifiedData: UserListItem[] = [];
            data.forEach((item) => {
                modifiedData.push({
                    key: item.id.toString(),
                    id: item.id,
                    name: item.name,
                    username: item.username,
                    email: item.email,
                    phone: item.phone,
                    zipcode: item.address.zipcode,
                });
            });
            dispatch(setUserList(modifiedData));
        }
    }, [data]);

    const handleDelete = () => {
        dispatch(deleteUser(selectedRowKeys));
    };

    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        if (selectedRowKeys.length > 0) {
            modal.confirm({
                title: "Confirm",
                icon: <ExclamationCircleOutlined />,
                content: `Вы действительно хотите удалить пользовател${
                    selectedRowKeys.length > 1 ? "ей" : "я"
                } ${selectedRowKeys}?`,
                okText: "Удалить",
                cancelText: "Отмена",
                onOk: handleDelete,
            });
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.submit();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log(filterVal);
    }, [filterVal]);

    return (
        <>
            <Modal
                title="Добавить пользователя"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <AddUserForm form={form} />
            </Modal>

            <input
                value={filterVal}
                onChange={(e) => setFilterVal(e.target.value)}
            />
            <select
                value={filterField}
                onChange={(e) =>
                    setFilterField(
                        (e.target.value as "name") || "email" || "phone"
                    )
                }
            >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
            </select>

            {contextHolder}
            <button onClick={showModal}>Добавить пользователя</button>
            <button onClick={confirm}>Удалить</button>
            {isLoading && <div>loading...</div>}

            {data && (
                <Table
                    dataSource={userList.filter((item) =>
                        item[filterField].includes(filterVal)
                    )}
                    columns={columns}
                    pagination={false}
                    rowSelection={{ type: "checkbox", ...rowSelection }}
                />
            )}

            {error && <div>возникла ошибка</div>}
        </>
    );
};

export default UserList;
