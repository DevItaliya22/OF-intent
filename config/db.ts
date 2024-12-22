import { DatabaseOptions, configNamespace } from '@intentjs/core';
import { knexSnakeCaseMappers } from 'objection';

console.log('DB_DEBUG', process.env.DB_DEBUG);

export default configNamespace(
  'db',
  (): DatabaseOptions => ({
    isGlobal: true,
    default: 'pg',
    connections: {
      pg: {
        client: 'pg',
        debug: !!+process.env.DB_DEBUG,
        connection: {
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          database: process.env.DB_DATABASE,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          charset: 'utf8',
          ssl: {
            rejectUnauthorized: false,  // Set to true to enforce SSL certificate validation
          },
        },
        useNullAsDefault: true,
        migrations: {
          directory: './database/migrations',
        },
        ...knexSnakeCaseMappers(),
      },
    },
  }),
);
