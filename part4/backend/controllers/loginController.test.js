import { beforeEach, describe, test, after } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import User from "../models/userModel.js";
import app from "../app.js";

const api = supertest(app);

const LOGIN_URI = "/api/login";

const rootUserData = {
  username: "root",
  password: "password123",
};

describe.only("LOGIN CONTROLLER", () => {
  describe.only("POST", () => {
    describe.only("happy path", () => {
      test.only("auth and send token to valid credentials", async () => {
        const response = await api
          .post(LOGIN_URI)
          .send(rootUserData)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        assert.strictEqual(Object.prototype.hasOwnProperty.call(response.body, "token"), true);
      });
    });
  });
});
