import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the global fetch
global.fetch = vi.fn();

// Define BASE_URL for tests
global.BASE_URL = "http://localhost:3000";

import { client } from "./client.js";

describe("API client", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("makes a successful fetch request and returns JSON data", async () => {
        const mockData = { id: 1, name: "Test" };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockData),
        });

        const result = await client("/api/data");

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("/api/data"),
            expect.objectContaining({
                headers: expect.objectContaining({
                    "Content-type": "application/json",
                }),
            }),
        );
        expect(result).toEqual(mockData);
    });

    it("includes custom headers in the request", async () => {
        const mockData = { success: true };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockData),
        });

        await client("/api/data", {
            headers: { Authorization: "Bearer token123" },
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: "Bearer token123",
                    "Content-type": "application/json",
                }),
            }),
        );
    });

    it("builds URL with query parameters", async () => {
        const mockData = { result: "ok" };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockData),
        });

        await client("/api/search", {
            params: { q: "test", limit: 10 },
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining("?q=test&limit=10"),
            expect.any(Object),
        );
    });

    it("throws error when response is not ok", async () => {
        const errorMessage = "Unauthorized";
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
            json: vi.fn().mockResolvedValueOnce({ message: errorMessage }),
        });

        await expect(client("/api/protected")).rejects.toThrow(errorMessage);
    });

    it("throws error with status code when response has no error message", async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: vi.fn().mockResolvedValueOnce({}),
        });

        await expect(client("/api/error")).rejects.toThrow("Erro HTTP: 500");
    });

    it("throws error when response JSON parsing fails", async () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation();
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: vi.fn().mockRejectedValueOnce(new Error("JSON parse error")),
        });

        await expect(client("/api/data")).rejects.toThrow(
            "Cannot read properties of undefined",
        );
        expect(consoleErrorSpy).toHaveBeenCalled();

        consoleErrorSpy.mockRestore();
    });

    it("passes custom config to fetch", async () => {
        const mockData = { status: "created" };
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValueOnce(mockData),
        });

        await client("/api/create", {
            method: "POST",
            body: JSON.stringify({ data: "test" }),
        });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({ data: "test" }),
            }),
        );
    });

    it("logs API errors to console", async () => {
        const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation();
        global.fetch.mockRejectedValueOnce(new Error("Network error"));

        await expect(client("/api/data")).rejects.toThrow("Network error");
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "API ERROR: ",
            expect.any(Error),
        );

        consoleErrorSpy.mockRestore();
    });
});
