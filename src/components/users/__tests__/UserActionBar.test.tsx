import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/testUtils";
import { FilterField } from "../../../models/FilterField";
import UserActionBar from "../UserActionBar";


const preloadedState = {
    users: {
        filterField: "name" as FilterField,
        filterValue: "",
        selectedRows: [],
    },
};

test("should render user action bar", () => {
    const { container } = renderWithProviders(
        <UserActionBar disabled={false} />
    );

    const filterSelector = container.getElementsByClassName("ant-select");
    const filterInput = screen.getByPlaceholderText("Input name to filter");
    const addUserButton = screen.getByText("Add user").closest("button");

    expect(filterSelector[0]).toBeInTheDocument();
    expect(filterInput).toBeInTheDocument();
    expect(addUserButton).toBeInTheDocument();
});

test("should not render delete button if no rows selected", () => {
    renderWithProviders(<UserActionBar disabled={false} />, {
        preloadedState: preloadedState,
    });

    const deleteButton = screen.queryByText("Delete");

    expect(deleteButton).not.toBeInTheDocument();
});

test("should disable inputs and buttons if disabled prop is true", () => {
    const { container } = renderWithProviders(
        <UserActionBar disabled={true} />
    );

    const disabled = container.querySelectorAll("[disabled]");

    expect(disabled).toHaveLength(3);
});
