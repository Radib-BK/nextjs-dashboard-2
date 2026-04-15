import postgres from 'postgres';

const globalForPostgres = globalThis as unknown as {
  sql: ReturnType<typeof postgres> | undefined;
};

export const sql =
  globalForPostgres.sql ??
  postgres(process.env.POSTGRES_URL!, {
    ssl: false,
    max: 5, // keep small for dev
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPostgres.sql = sql;
}