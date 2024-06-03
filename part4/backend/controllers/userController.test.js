import { beforeEach, describe, test, after } from "node:test";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import assert from "node:assert";
import supertest from "supertest";
import app from "../app.js";
import User from "../models/userModel.js";

const api = supertest(app);

const USERS_URI = "/api/users";

const dummyUserData = {
  userWithName: {
    name: "John Doe",
    username: "johndoe",
  },
  userWithoutName: {
    username: "randomdude",
  },
};

const dummyHash = await bcrypt.hash("dummyPassword", 10);
const dummyPassword = "dummyPassword";

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("password123", 10);
  const rootUser = new User({ username: "root", passwordHash });

  await rootUser.save();
});

describe.only("USERS CONTROLLER", () => {
  test("db initialize with a root user", async () => {
    const usersFound = await User.find({});

    assert(usersFound.length === 1);
    assert(usersFound[0].username === "root");
  });

  test("correctly add default value for name", async () => {
    const { username } = dummyUserData.userWithoutName;

    const newUser = new User({ username, passwordHash: dummyHash });
    const savedUser = await newUser.save();

    assert(savedUser.name === "Anonymous");
  });

  describe("GET", () => {
    test("correctly get users", async () => {
      const usersInDb = await User.find({});

      const { body } = await api
        .get(USERS_URI)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const usersFromRequest = body;

      assert(usersInDb.length === usersFromRequest.length);
    });
  });

  describe.only("POST", () => {
    test("create user given unique username", async () => {
      const { username } = dummyUserData.userWithoutName;
      const requestData = { username, password: dummyPassword };

      await api
        .post(USERS_URI)
        .send(requestData)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    });

    test("returns 400 Bad Request if username is already found", async () => {
      const username = "root";
      const requestData = { username, password: dummyPassword };

      const usersBefore = await User.find({});

      await api
        .post(USERS_URI)
        .send(requestData)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAfter = await User.find({});
      assert(usersBefore.length === usersAfter.length);
    });

    test("returns 400 Bad Request if username is less than 3 chars", async () => {
      const username = "lv";
      const requestData = { username, password: dummyPassword };

      const usersBefore = await User.find({});

      await api
        .post(USERS_URI)
        .send(requestData)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAfter = await User.find({});
      assert(usersBefore.length === usersAfter.length);
    });

    test.only("returns 400 Bad Request if password is less than 3 chars", async () => {
      const requestData = { username: "lvo", password: "ab" };

      const usersBefore = await User.find({});

      await api
        .post(USERS_URI)
        .send(requestData)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const usersAfter = await User.find({});
      assert(usersBefore.length === usersAfter.length);
    });
  });
});

after(() => mongoose.connection.close());
