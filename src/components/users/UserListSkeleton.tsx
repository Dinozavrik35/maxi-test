import { FC } from "react";
import { Skeleton, Table, TableColumnsType } from "antd";
import { tableSettings } from "./UserList/userListSettings";


type UserListSkeletonProps = {
    columns: TableColumnsType<any>;
};


const UserListSkeleton: FC<UserListSkeletonProps> = ({ columns }) => {
    const skeletonDataSource = [...Array(10)].map((_, index) => ({
        key: `key${index}`,
    }));

    const skeletonColumns = columns.map((column: any) => ({
        title: column.title,
        key: column.key,
        dataIndex: column.dataIndex,
        width: column.width,
        render: () => {
            return (
                <Skeleton
                    key={column.key}
                    title={column.key === "photo" ? false : true}
                    avatar={column.key === "photo" ? true : false}
                    paragraph={false}
                    active
                />
            );
        },
    }));

    return (
        <Table
            rowKey="key"
            dataSource={skeletonDataSource}
            {...tableSettings}
            rowSelection={{
                type: "checkbox",
                getCheckboxProps: () => ({
                    disabled: true,
                }),
            }}
            columns={skeletonColumns}
        />
    );
};

export default UserListSkeleton;
