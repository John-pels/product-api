import * as user from "../user";

describe("user handler", () => {
  it("should create a new user", async () => {
    const req: any = { body: { username: "hello", password: "hiiiiiyi" } };
    const res: any = {
      json({ token }: any) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
});
