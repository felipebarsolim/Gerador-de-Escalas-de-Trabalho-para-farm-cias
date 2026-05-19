import { Pool } from "pg";

const pool = new Pool({
    host: "aws-1-us-west-2.pooler.supabase.com",
    port: 5432,
    database: "postgres",
    user: "postgres.uyjhirpcptsfvbvnibgb",
    password: "Cremoso79@@@@@",
    ssl: {
        rejectUnauthorized: false,
    },
});

export const database = {
    query: (text, params) => pool.query(text, params),
};
