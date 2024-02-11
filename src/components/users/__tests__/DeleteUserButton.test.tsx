import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import DeleteUserButton from "../DeleteUserButton";
import { renderWithProviders } from "../../../utils/testUtils";
import { FilterFieldType } from "../../../store/slices/usersSlice";

const preloadedState = {
    users: {
        filterField: "name" as FilterFieldType,
        filterValue: "",
        selectedRows: ["1", "2", "3"],
    },
};

test("should render delete button", () => {
    renderWithProviders(<DeleteUserButton />);

    const deleteButton = screen.getByText("Delete").closest("button");
    expect(deleteButton).toBeInTheDocument();
});

test("should show confirm window on delete button click", () => {
    renderWithProviders(<DeleteUserButton />);

    const deleteButton = screen.getByText("Delete").closest("button");
    userEvent.click(deleteButton!);

    const confirmModal = screen.getByText("Confirm");
    expect(confirmModal).toBeInTheDocument();
});

test("should hide confirm window on cancel button click", () => {
    renderWithProviders(<DeleteUserButton />);

    const deleteButton = screen.getByText("Delete").closest("button");
    userEvent.click(deleteButton!);
    const confirmModal = screen.getByText("Confirm");

    const cancelModalButton = screen.getByText("Cancel");
    userEvent.click(cancelModalButton!);

    expect(confirmModal).not.toBeVisible();
});

test("should show list of selected users to delete", () => {
    renderWithProviders(<DeleteUserButton />, {
        preloadedState: preloadedState,
    });

    const deleteButton = screen.getByText("Delete").closest("button");
    userEvent.click(deleteButton!);

    const confirmModalDescription = screen.getByText("Are you sure", {
        exact: false,
    });
    expect(confirmModalDescription).toHaveTextContent(
        "Are you sure you want to delete users 1, 2, 3?"
    );
});
