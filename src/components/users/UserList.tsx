import { FC } from "react";
import styled from "styled-components";
import { Table, TableColumnsType } from "antd";
import { UserListItem, useGetUserListQuery } from "../../services/api/userApi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setSelectedRows } from "../../store/slices/usersSlice";
import UserListSkeleton from "./UserListSkeleton";

const StyledUserList = styled.div`
    .ant-table-column-title,
    th {
        user-select: none;
    }

    .ant-table-selection-column {
        padding-inline-start: 16px !important;
    }

    .ant-table-tbody > tr > td {
        word-break: break-word;
    }
`;

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

const columns: TableColumnsType<UserListItem> = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: "5%",
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: "Photo",
        dataIndex: "name",
        key: "photo",
        width: "7%",
        render: (name, item) => (
            <StyledImagePlaceholder color={item.color}>
                {name.toUpperCase()[0]}
            </StyledImagePlaceholder>
        ),
    },
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "15%",
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "22%",
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone ",
        width: "19%",
    },
    {
        title: "ZIP Code",
        dataIndex: "zipcode",
        key: "zipcode ",
        width: '12%',
        sorter: ({ zipcode: aZipcode = "" }, { zipcode: bZipcode = "" }) =>
            aZipcode.localeCompare(bZipcode),
    },
];

const UserList: FC = () => {
    const { selectedRows, filterField, filterValue } = useAppSelector(
        (state) => state.users
    );
    const { data, error, isLoading } = useGetUserListQuery();
    const dispatch = useAppDispatch();

    const onSelectChange = (newSelectedRows: React.Key[]) => {
        dispatch(
            setSelectedRows(
                newSelectedRows.sort((a, b) => Number(a) - Number(b))
            )
        );
    };

    return (
        <StyledUserList>
            {isLoading && <UserListSkeleton columns={columns} />}

            {data && (
                <Table
                    dataSource={data.filter((item) =>
                        item[filterField]
                            .toLocaleLowerCase()
                            .replace(/[_()+.-]/g, "")
                            .includes(filterValue)
                    )}
                    columns={columns}
                    pagination={false}
                    showSorterTooltip={false}
                    scroll={{ x: 1050 }}
                    sticky={true}
                    rowSelection={{
                        type: "checkbox",
                        selectedRowKeys: selectedRows,
                        onChange: onSelectChange,
                    }}
                />
            )}

            {error && <div>error</div>}
        </StyledUserList>
    );
};

export default UserList;
