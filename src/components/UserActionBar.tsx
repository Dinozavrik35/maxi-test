import { FC } from "react";
import styled from "styled-components";
import { Input, Select } from "antd";
import { FilterTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
    FilterFieldType,
    setFilterField,
    setFilterValue,
} from "../store/slices/userSlice";
import AddUserButton from "./AddUserButton";
import DeleteUserButton from "./DeleteUserButton";

const StyledUserActionBar = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 0;
    width: fit-content;
    min-width: 500px;

    > * {
        margin-right: 10px;
        transition: all 0.3s;

        &:last-child {
            margin-right: 0;
        }

        .anticon-filter {
            margin-right: 7px;
        }
    }
`;

const UserActionBar: FC = () => {
    const dispatch = useAppDispatch();

    const { selectedRows, filterField, filterValue } = useAppSelector(
        (state) => state.user
    );

    const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setFilterValue(e.target.value));

    const handleFilterSelect = (newFilterField: FilterFieldType) =>
        dispatch(setFilterField(newFilterField));

    const filterSelect = (
        <>
            <FilterTwoTone />
            <Select
                onChange={handleFilterSelect}
                value={filterField}
                options={[
                    { value: "name", label: <span>Name</span> },
                    { value: "email", label: <span>Email</span> },
                    { value: "phone", label: <span>Phone</span> },
                ]}
            />
        </>
    );

    return (
        <StyledUserActionBar>
            <Input
                value={filterValue}
                onChange={handleFilterInput}
                addonBefore={filterSelect}
                placeholder={`Input ${filterField} to filter`}
            />
            <AddUserButton />
            {selectedRows.length > 0 && <DeleteUserButton />}
        </StyledUserActionBar>
    );
};

export default UserActionBar;
