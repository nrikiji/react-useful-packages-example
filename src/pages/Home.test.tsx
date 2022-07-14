import { render, screen, cleanup } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "./Home";
import { TestProvider } from "../libs/TestUtil";
import { API_URL } from "../services/api";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe("ホーム画面", () => {
  it("ユーザー一覧の表示", async () => {
    const data = [
      { id: 1, email: "foo@example.com" },
      { id: 2, email: "bar@example.com" },
      { id: 3, email: "baz@example.com" },
    ];
    server.use(rest.get(API_URL + "/users", (req, res, ctx) => res(ctx.status(200), ctx.json({ data }))));
    render(
      <TestProvider>
        <Home />
      </TestProvider>
    );
    const items = (await screen.findAllByRole("listitem")).map((x) => x.textContent);
    const expected = data.map((x) => x.id + ":" + x.email);
    expect(items).toEqual(expected);
  });
});
