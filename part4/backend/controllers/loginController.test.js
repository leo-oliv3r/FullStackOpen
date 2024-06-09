import mongoose from "mongoose";
import { describe, test, after } from "node:test";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

const LOGIN_URI = "/api/login";

const rootUserData = {
  username: "root",
  password: "password123",
};

describe("LOGIN CONTROLLER", () => {
  describe("POST", () => {
    describe("happy path", () => {
      test("auth and send token to valid credentials", async () => {
        const response = await api
          .post(LOGIN_URI)
          .send(rootUserData)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        assert.strictEqual(Object.prototype.hasOwnProperty.call(response.body, "token"), true);
      });
    });

    describe("unhappy path", () => {
      test("rejest with 400 given no username", async () => {
        const request = { password: rootUserData.password };

        await api
          .post(LOGIN_URI)
          .send(request)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });

      test("rejest with 400 given no password", async () => {
        const request = { username: rootUserData.username };

        await api
          .post(LOGIN_URI)
          .send(request)
          .expect(400)
          .expect("Content-Type", /application\/json/);
      });

      test("reject with 401 if no user was found with provided username", async () => {
        const request = { username: "invalidusername", password: rootUserData.password };
        await api
          .post(LOGIN_URI)
          .send(request)
          .expect(401)
          .expect("Content-Type", /application\/json/);
      });

      test("reject with 401 if password don't match", async () => {
        const request = { username: rootUserData.username, password: "wrongpassword" };
        await api
          .post(LOGIN_URI)
          .send(request)
          .expect(401)
          .expect("Content-Type", /application\/json/);
      });
    });
  });
});

after(() => mongoose.connection.close());
