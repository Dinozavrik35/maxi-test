import { render, screen } from "@testing-library/react";
import UserListSkeleton from "../UserListSkeleton";

const columnsMock = [
    { title: "test field 1" },
    { title: "test field 2" },
    { title: "test field 3" },
];

test("should render provided columns", () => {
    render(<UserListSkeleton columns={columnsMock} />);

    const columns = screen.getAllByText(/^test field [1-3]$/, {
        selector: "th",
    });

    expect(columns).toHaveLength(3);
});
