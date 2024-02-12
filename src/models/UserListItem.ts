import { UserDTO } from "./UserDTO";

export type UserListItem = { key: string; color: string } & Omit<
    UserDTO,
    "address" | "company" | "website"
> & { zipcode?: string };