import dotenv from "dotenv";
dotenv.config();
import request from "supertest";
import app from "../app";
import prisma from "@repo/db/client"

const BACKEND_URL = "/api/v1/auth";
// process.env.JWT_SECRET ??= "test_secret_value";

const testUser = {
    email: "walter.white@breakingbad.com",
    password: "Heisenberg"
};

beforeAll(async () => {
    await prisma.user.deleteMany();
});

afterAll(async () => {
    await prisma.$disconnect();
});


describe("Register User", () => {
    
    it("Should register a new user", async () => {
        const res = await request(app).post(`${BACKEND_URL}/register`).send(testUser);
        expect(res.status).toBe(201);
        expect(res.body.message).toBe("User registered successfully");
    });

    it("Should fail if email is missing", async () => {
        const res = await request(app).post(`${BACKEND_URL}/register`).send({ password: testUser.password});
        expect(res.status).toBe(400);
    });

    it("Should fail if password is missing", async () => {
        const res = await request(app).post(`${BACKEND_URL}/register`).send({ email: testUser.email});
        expect(res.status).toBe(400);
    });    

    it("Should fail if email is invalid", async () => {
        const res = await request(app).post(`${BACKEND_URL}/register`).send({ email: "invalid email"});
        expect(res.status).toBe(400);
    });    

    it("Should fail if email already exists", async () => {
        const res = await request(app).post(`${BACKEND_URL}/register`).send(testUser);
        expect(res.status).toBe(409);
    });

});

describe("Login User", () => {
    
    beforeEach(async () => {
        await prisma.user.deleteMany();
        await request(app).post(`${BACKEND_URL}/register`).send(testUser);
    });

    it("Should login with correct credentials", async () => {
        const res = await request(app).post(`${BACKEND_URL}/login`).send(testUser);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User Logged In Successfully");
        expect(res.body.data.token).toBeDefined();
        expect(res.body.data.token).toMatch(/^ey/);
        const cookies = res.headers['set-cookie'];
        expect(cookies).toBeDefined();
        if(Array.isArray(cookies)){
            expect(cookies?.some(cookie => cookie.startsWith("accessToken="))).toBe(true);
        }else{
            expect(cookies?.startsWith("accessToken=ey")).toBe(true);
        }
    });

    it("Should fail if email is missing", async () => {
        const res = await request(app).post(`${BACKEND_URL}/login`).send({ password: testUser.password});
        expect(res.status).toBe(400);
    });

    it("Should fail if password is missing", async () => {
        const res = await request(app).post(`${BACKEND_URL}/login`).send({ email: testUser.email});
        expect(res.status).toBe(400);
    });    

    it("Should fail if email is invalid", async () => {
        const res = await request(app).post(`${BACKEND_URL}/login`).send({ email: "invalid email"});
        expect(res.status).toBe(400);
    });   

    it("Should fail for incorrect email", async () => {
        const res = await request(app).post(`${BACKEND_URL}/login`).send({
            email: "jesse.pinkman@breakingbad.com",
            password: testUser.password
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid email or password")
    });

    it("Should fail for incorrect password", async () => {
        const res = await request(app).post(`${BACKEND_URL}/login`).send({
            email: testUser.email,
            password: "fakepassword"
        });
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Invalid email or password")
    });
});

describe("User logout", () => {

    beforeEach(async() => {
        await prisma.user.deleteMany();
        await request(app).post(`${BACKEND_URL}/register`).send(testUser);
    });

    let cookie: string | undefined;

    it("Should logged in", async () => {
        const res = await request(app).post(`${BACKEND_URL}/login`).send(testUser);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User Logged In Successfully");
        const cookies = res.headers['set-cookie'];
        cookie = res.headers['set-cookie'];
        expect(cookies).toBeDefined();
        if(Array.isArray(cookies)){
            expect(cookies?.some(cookie => cookie.startsWith("accessToken="))).toBe(true);
        }else{
            expect(cookies?.startsWith("accessToken=ey")).toBe(true);
        }
    });

    it("Should logged out", async () => {
        const res = await request(app).post(`${BACKEND_URL}/logout`).set('Cookie', cookie!);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User logged out succefully");
    });
})