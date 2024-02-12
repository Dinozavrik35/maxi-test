import userEvent from "@testing-library/user-event";
import { renderHook, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/testUtils";
import { FilterField } from "../../../models/FilterField";
import DeleteUserButton from "../DeleteUserButton";


const preloadedState = {
    users: {
        filterField: "name" as FilterField,
        filterValue: "",
        selectedRows: ["1", "2", "3"],
    },
};

jest.mock("antd", () => {
    const antd = jest.requireActual("antd");
    const { App } = antd;

    return {
        ...antd,
        App: {
            ...App,
            useApp: () => {
                return {
                    notification: {
                        success: jest.fn(),
                    },
                };
            },
        },
    };
});


describe("DeleteUserButton", () => {
    let deleteButton: HTMLButtonElement | null;
    let renderContainer: HTMLElement;

    beforeEach(() => {
        const { container } = renderWithProviders(<DeleteUserButton />, {
            preloadedState: preloadedState,
        });
        renderContainer = container;
        deleteButton = screen.getByText("Delete").closest("button");
    });

    test("should render delete button", () => {
        expect(deleteButton).toBeInTheDocument();
    });

    test("should show confirm window on delete button click", async () => {
        userEvent.click(deleteButton!);

        const confirmModal = screen.getByText("Confirm");

        await waitFor(() => {
            expect(confirmModal).toBeVisible();
        });
    });

    test("should hide confirm window on cancel button click", async () => {
        userEvent.click(deleteButton!);
        const confirmModal = screen.getByText("Confirm");

        const cancelModalButton = screen.getByText("Cancel");
        userEvent.click(cancelModalButton!);

        await waitFor(() => {
            expect(confirmModal).not.toBeVisible();
        });
    });

    test("should show list of selected users to delete", () => {
        userEvent.click(deleteButton!);

        const confirmModalDescription = screen.getByText("Are you sure", {
            exact: false,
        });
        expect(confirmModalDescription).toHaveTextContent(
            "Are you sure you want to delete users 1, 2, 3?"
        );
    });

    test("should hide confirm window on delete confirmation", async () => {
        userEvent.click(deleteButton!);

        const okModalButton = screen.getAllByText("Delete");
        userEvent.click(okModalButton[1]!);

        const confirmModal = screen.queryByText("Confirm");

        await waitFor(() => {
            expect(confirmModal).not.toBeInTheDocument();
        });
    });
});
