import { FC } from "react";
import UserActionBar from "../components/UserActionBar";
import UserList from "../components/UserList";

const UsersPage: FC = () => {
    return (
        <>
            <UserActionBar  />
            <UserList />
        </>
    );
};

export default UsersPage;
