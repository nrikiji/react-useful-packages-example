import { render, screen, cleanup } from "@testing-library/react";
import Login from "./Login";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import { TestProvider } from "../libs/TestUtil";
import { API_URL } from "../services/api";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("ログイン画面", () => {
  it("ログインボタンの初期状態", () => {
    render(
      <TestProvider>
        <Login />
      </TestProvider>
    );
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  it("ログイン失敗", async () => {
    server.use(rest.post(API_URL + "/login", (req, res, ctx) => res(ctx.status(422))));
    render(
      <TestProvider>
        <Login />
      </TestProvider>
    );
    const email = screen.getByPlaceholderText("Email");
    await userEvent.type(email, "foo@example.com");
    const password = screen.getByPlaceholderText("Password");
    await userEvent.type(password, "password");
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("ログインできませんでした");
  });
});
