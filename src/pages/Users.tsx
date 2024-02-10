import { FC } from "react";
import UserActionBar from "../components/users/UserActionBar";
import UserList from "../components/users/UserList";

const Users: FC = () => {
    return (
        <>
            <UserActionBar />
            <UserList />
        </>
    );
};

export default Users;
