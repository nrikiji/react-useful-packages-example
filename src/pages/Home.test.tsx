import { render, screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "./Home";
import { renderWithProviders } from "../utils/test-utils";
import { API_URL } from "../services/api";
import { setupStore } from "../app/store";
import userEvent from "@testing-library/user-event";

const server = setupServer();

const data = [
  { id: 1, email: "foo@example.com" },
  { id: 2, email: "bar@example.com" },
  { id: 3, email: "baz@example.com" },
];

beforeAll(() => {
  server.listen();
  server.use(rest.get(API_URL + "/users", (req, res, ctx) => res(ctx.status(200), ctx.json({ data }))));
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe("ホーム画面", () => {
  it("ユーザー一覧の表示", async () => {
    renderWithProviders(<Home />);
    const items = (await screen.findAllByRole("listitem")).map((x) => x.textContent);
    const expected = data.map((x) => x.id + ":" + x.email);
    expect(items).toEqual(expected);
  });

  it("ログアウト", async () => {
    let store = setupStore({ auth: { token: "foo" } });
    renderWithProviders(<Home />, { store });
    await userEvent.click(await screen.findByRole("button"));
    expect(store.getState().auth.token).toBeNull();
  });
});
