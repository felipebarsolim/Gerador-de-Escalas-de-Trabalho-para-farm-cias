// import dotenv from "dotenv";

// dotenv.config();

const BASE_URL = "http://localhost:8989";

/**
 *Cria uma requisição para uma URl
 * @param {string} endpoint
 * @param {Object} options
 * @returns {response<JSON>}
 * @throws {Error}
 */
export const client = async (endpoint, options = {}) => {
    const { params, headers, ...customConfig } = options;

    let url = `${BASE_URL}${endpoint}`;
    if (params) {
        const searchParams = new URLSearchParams(params).toString();
        url += `?${searchParams}`;
    }

    const defaultHeaders = {
        "Content-type": "application/json",
    };

    const config = {
        ...customConfig,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorData = await response.json().catch(() => {});
            throw new Error(errorData || `Erro HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`API Error -> ${error.message}`);
    }
};
