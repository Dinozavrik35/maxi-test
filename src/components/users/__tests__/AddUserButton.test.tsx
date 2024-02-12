import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../utils/testUtils";
import AddUserButton from "../AddUserButton";


describe("AddUserButton", () => {
    let addUserButton: HTMLButtonElement | null;

    beforeEach(() => {
        renderWithProviders(<AddUserButton disabled={false} />);
        addUserButton = screen.getByText("Add user").closest("button");
    });

    test("should render add user button", () => {
        expect(addUserButton).toBeInTheDocument();
    });

    test("should show add user modal on click", async () => {
        userEvent.click(addUserButton!);

        const addUserModal = screen.getByText("Add new user", {
            selector: "div",
        });

        await waitFor(() => {
            expect(addUserModal).toBeVisible();
        });

    });

    test("should hide add user modal on cancel button click", async () => {
        userEvent.click(addUserButton!);

        const addUserModal = screen.getByText("Add new user", {
            selector: "div",
        });

        await waitFor(() => {
            expect(addUserModal).toBeVisible();
        });

        const cancelModalButton = screen.getByText("Cancel");
        userEvent.click(cancelModalButton!);

        await waitFor(() => {
            expect(addUserModal).not.toBeVisible();
        });
    });
});
