import { Skeleton, Table, TableColumnsType } from "antd";
import { FC } from "react";

type UserListSkeletonProps = {
    columns: TableColumnsType<any>;
};

const UserListSkeleton: FC<UserListSkeletonProps> = ({ columns }) => {
    const skeletonDataSource = [...Array(10)].map((_, index) => ({
        key: `key${index}`,
    }));

    return (
        <Table
            rowKey="key"
            pagination={false}
            dataSource={skeletonDataSource}
            rowSelection={{
                type: "checkbox",
                getCheckboxProps: () => ({
                    disabled: true,
                }),
            }}
            columns={columns.map((column: any) => {
                return {
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
                };
            })}
        />
    );
};

export default UserListSkeleton;
