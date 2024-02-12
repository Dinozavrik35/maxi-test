import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import UserList from "../UserList/UserList";
import { baseUrl } from "../../../services/api/userApi";
import { renderWithProviders } from "../../../utils/testUtils";

const server = setupServer(
    http.get(`${baseUrl}users`, () => {
        return HttpResponse.json([
            {
                id: 1,
                name: "test user 1",
                username: "string",
                email: "string",
                address: {
                    zipcode: "string",
                },
                phone: "string",
                website: "string",
                company: {},
            },
            {
                id: 2,
                name: "test user 2",
                username: "string",
                email: "string",
                address: {
                    zipcode: "string",
                },
                phone: "string",
                website: "string",
                company: {},
            },
        ]);
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("UserList", () => {
    test("should render user table based on getUsers response", async () => {
        renderWithProviders(<UserList />);

        const firstUserRow = await screen.findByText("test user 1", {
            selector: "td",
        });
        const userRows = await screen.findAllByText(/^test user [1-2]$/, {
            selector: "td",
        });

        expect(firstUserRow).toBeInTheDocument();
        expect(userRows).toHaveLength(2);
    });

    test("should show skeleton while request is loading", async () => {
        const { container } = renderWithProviders(<UserList />);

        expect(container.querySelector(".ant-skeleton")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("test user 1")).toBeInTheDocument();
        });

        expect(
            container.querySelector(".ant-skeleton")
        ).not.toBeInTheDocument();
    });

    test("should render error message if request failed", async () => {
        renderWithProviders(<UserList />);

        server.use(
            http.get(`${baseUrl}users`, () => {
                return HttpResponse.json(null, { status: 500 });
            })
        );

        const errorTitle = await screen.findByText("500");
        const errorText = await screen.findByText(
            "Sorry, something went wrong. Please try again."
        );

        expect(errorTitle).toBeInTheDocument();
        expect(errorText).toBeInTheDocument();
    });

    test("should check rows", async () => {
        const { container } = renderWithProviders(<UserList />);

        await waitFor(() => {
            const row = container.querySelector(
                ".ant-checkbox-input:not([aria-label='Select all'])"
            );
            userEvent.click(row!);
        });

        expect(
            container.querySelectorAll(".ant-table-row-selected")
        ).toHaveLength(1);
    });

    test("should sort by id", async () => {
        const { container } = renderWithProviders(<UserList />);

        await waitFor(() => {
            const idColumn = container.querySelector("[aria-label='ID']");
            userEvent.click(idColumn!);
        });

        expect(
            screen.getAllByText(/^test user [1-2]$/, {
                selector: "td",
            })[0]
        ).toHaveTextContent("test user 1");

        await waitFor(() => {
            const idColumn = container.querySelector("[aria-sort]");
            userEvent.click(idColumn!);
        });

        expect(
            screen.getAllByText(/^test user [1-2]$/, {
                selector: "td",
            })[0]
        ).toHaveTextContent("test user 2");
    });
});
