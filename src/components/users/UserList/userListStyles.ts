import { Alert } from "antd";
import styled from "styled-components";


const StyledUserList = styled.div`
    .ant-table-column-title,
    th {
        user-select: none;
    }

    .ant-table-selection-col {
        width: 48px;
    }

    .ant-table-tbody > tr > td {
        word-break: break-word;
    }
`;

const StyledAntDAlert = styled(Alert)`
    margin: 16px 16px 0;
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


export { StyledUserList, StyledAntDAlert, StyledImagePlaceholder };
