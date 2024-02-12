import { FC } from "react";
import { Table } from "antd";
import UserActionBar from "../UserActionBar";
import UserListSkeleton from "../UserListSkeleton";
import { columns, tableSettings } from "./userListSettings";
import { setSelectedRows } from "../../../store/slices/usersSlice";
import { StyledAntDAlert, StyledUserList } from "./userListStyles";
import { useGetUserListQuery } from "../../../services/api/userApi";
import { transformFilterValue } from "../../../utils/transformFilterValue";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";


const UserList: FC = () => {
    const { selectedRows, filterField, filterValue } = useAppSelector(
        (state) => state.users
    );
    const { data, error, isLoading } = useGetUserListQuery();
    const dispatch = useAppDispatch();

    const filteredList = data?.filter((item) =>
        transformFilterValue(item[filterField]).includes(
            transformFilterValue(filterValue)
        )
    );

    const onSelectChange = (newSelectedRows: React.Key[]) => {
        dispatch(
            setSelectedRows(
                newSelectedRows.sort((a, b) => Number(a) - Number(b))
            )
        );
    };

    return (
        <StyledUserList>
            {!error && <UserActionBar disabled={isLoading} />}

            {isLoading && <UserListSkeleton columns={columns} />}

            {data && (
                <Table
                    dataSource={filteredList}
                    {...tableSettings}
                    rowSelection={{
                        type: "checkbox",
                        selectedRowKeys: selectedRows,
                        onChange: onSelectChange,
                    }}
                />
            )}

            {error && (
                <StyledAntDAlert
                    message={'status' in error ? error.status : 'Error'}
                    description="Sorry, something went wrong. Please try again."
                    type="error"
                    showIcon
                />
            )}
        </StyledUserList>
    );
};


export default UserList;
