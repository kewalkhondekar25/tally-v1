import request from "supertest";
import app from "../app";

const BACKEND_URL = "/api/v1"

describe("Server health check", () => {

    it("Check server health", async () => {
        
        const res = await request(app).get(`${BACKEND_URL}/health/check`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("HEALTH CHECK PASSED");
    });
});