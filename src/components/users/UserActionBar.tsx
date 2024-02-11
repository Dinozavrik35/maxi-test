import { FC, useRef } from "react";
import styled from "styled-components";
import { InputRef, Select, Space } from "antd";
import { FilterTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
    FilterFieldType,
    setFilterField,
    setFilterValue,
} from "../../store/slices/usersSlice";
import AddUserButton from "./AddUserButton";
import DeleteUserButton from "./DeleteUserButton";
import { MaskedInput } from "antd-mask-input";
import { anySybmolRegex, noLettersRegex } from "../../constants/regex";


const StyledUserActionBar = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 16px;
    width: fit-content;
    gap: 10px;

    @media (max-width: 767px) {
        width: 100%;
        align-items: flex-start;
        flex-direction: column;
    }

    input {
        min-width: 350px;

        @media (max-width: 767px) {
            min-width: unset;
            flex-grow: 1;
        }
    }

    .anticon-filter {
        margin-right: 7px;
    }
`;


const UserActionBar: FC<{ disabled: boolean }> = ({disabled}) => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<InputRef>(null);
    const { selectedRows, filterField, filterValue } = useAppSelector(
        (state) => state.users
    );

    const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setFilterValue(e.target.value));

    const handleFilterSelect = (newFilterField: FilterFieldType) => {
        dispatch(setFilterField(newFilterField));
        inputRef.current?.focus();
    };

    const FilterSelect = (
        <>
            <FilterTwoTone />
            <Select
                onChange={handleFilterSelect}
                value={filterField}
                disabled={disabled}
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
            <MaskedInput
                name="filterValue"
                value={filterValue}
                onChange={handleFilterInput}
                addonBefore={FilterSelect}
                placeholder={`Input ${filterField} to filter`}
                ref={inputRef}
                disabled={disabled}
                mask={filterField === "phone" ? noLettersRegex : anySybmolRegex}
            />
            <Space>
                <AddUserButton disabled={disabled} />
                {selectedRows.length > 0 && <DeleteUserButton />}
            </Space>
        </StyledUserActionBar>
    );
};

export default UserActionBar;
