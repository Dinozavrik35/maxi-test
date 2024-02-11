import { TableColumnsType } from "antd";
import { UserListItem } from "../../../services/api/userApi";
import { StyledImagePlaceholder } from "./userListStyles";


export const columns: TableColumnsType<UserListItem> = [
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
        width: "17%",
    },
    {
        title: "ZIP Code",
        dataIndex: "zipcode",
        key: "zipcode ",
        width: "12%",
        sorter: ({ zipcode: aZipcode = "" }, { zipcode: bZipcode = "" }) =>
            aZipcode.localeCompare(bZipcode),
    },
];

type TableSettingsType = {
    columns: TableColumnsType<UserListItem>;
    pagination: false;
    showSorterTooltip: boolean;
    scroll: { x: number };
    sticky: boolean;
};

export const tableSettings: TableSettingsType = {
    columns: columns,
    pagination: false,
    showSorterTooltip: false,
    scroll: { x: 1050 },
    sticky: true,
};
