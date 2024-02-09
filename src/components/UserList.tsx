import { FC } from "react";
import styled from "styled-components";
import { Table, TableColumnsType } from "antd";
import { useGetUserListQuery } from "../services/api/userApi";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { UserListItem, setSelectedRows } from "../store/slices/userSlice";
import { getRandomColor } from "../helpers/getRandomColor";

const StyledImagePlaceholder = styled.span<{ color: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    background-color: ${(props) => props.color};
    width: 35px;
    height: 35px;
    aspect-ratio: 1 / 1;
    padding: 10px;
    border-radius: 50%;
`;

const randomColors: string[] = [];

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
        render: (name, item) => (
            <StyledImagePlaceholder
                color={randomColors[item.id - 1] ?? "#333333"}
            >
                {name.toUpperCase()[0]}
            </StyledImagePlaceholder>
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
    const { selectedRows, filterField, filterValue } = useAppSelector(
        (state) => state.user
    );
    const { data, error, isLoading } = useGetUserListQuery();
    const dispatch = useAppDispatch();

    data?.forEach(() => randomColors.push(getRandomColor()));

    const onSelectChange = (newSelectedRows: React.Key[]) =>
        dispatch(setSelectedRows(newSelectedRows));

    const rowSelection = {
        selectedRows,
        onChange: onSelectChange,
    };

    return (
        <>
            {isLoading && <div>loading...</div>}

            {data && (
                <Table
                    dataSource={data.filter((item) =>
                        item[filterField]
                            .toLocaleLowerCase()
                            .includes(filterValue)
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
