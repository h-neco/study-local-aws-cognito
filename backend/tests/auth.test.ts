import request from "supertest";
import app from "../src/app"; // Express アプリ
import { env } from "../src/config/env";

describe("Auth API (Local)", () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 10000000〜99999999
  const testEmail = `test${randomNumber}@example.com`;
  const testPassword = "Passw0rd!";
  let accessToken = "";

  it("signup", async () => {
    const res = await request(app)
      .post("/auth/signup")
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("confirm signup", async () => {
    const res = await request(app).get(
      `/auth/confirm?email=${encodeURIComponent(testEmail)}&code=999999`
    );
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("有効化されました");
  });

  it("login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: testEmail, password: testPassword });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    accessToken = res.body.accessToken;
  });

  it("update email", async () => {
    const newEmail = "newtest@example.com";
    const res = await request(app)
      .post("/auth/update-email")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ newEmail, accessToken });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("Confirmation mail sent");
  });

  it("confirm email change", async () => {
    const newEmail = "newtest@example.com";
    const res = await request(app)
      .get(
        `/auth/email-change-confirm?newEmail=${encodeURIComponent(
          newEmail
        )}&accessToken=${encodeURIComponent(accessToken)}&code=999999`
      )
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain(
      "メールアドレスが newtest@example.com に変更されました"
    );
  });

  it("change password", async () => {
    console.log({ accessToken });
    const res = await request(app)
      .post("/auth/update-password")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        previousPassword: "Passw0rd!",
        proposedPassword: "NewPassw0rd!",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain("パスワードが変更されました");
  });
});
