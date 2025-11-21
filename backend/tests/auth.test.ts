import request from "supertest";
import app from "../src/app"; // Express アプリ

describe("Auth API (Local)", () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 10000000〜99999999
  const testEmail = `test${randomNumber}@example.com`;
  const testPassword = "Passw0rd!";
  let accessToken = "";
  let refreshToken = "";

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
    expect(res.statusCode).toBe(302);
  });

  it("login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");

    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it("refresh tokens", async () => {
    const res = await request(app)
      .post("/auth/refresh-tokens")
      .send({ refreshToken });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("AccessToken");

    accessToken = res.body.AccessToken;
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
    expect(res.statusCode).toBe(302);
  });

  it("change password", async () => {
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

  it("delete", async () => {
    const res = await request(app)
      .post("/auth/delete")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});
