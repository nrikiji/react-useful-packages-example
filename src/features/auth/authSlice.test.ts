import reducer, { setToken, clearToken } from "./authSlice";

test("トークンをセットする", () => {
  expect(reducer({ token: null }, setToken("foo"))).toEqual({ token: "foo" });
});

test("トークンをリセットする", () => {
  expect(reducer({ token: "foo" }, clearToken())).toEqual({ token: null });
});
