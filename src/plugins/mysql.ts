import fp from "fastify-plugin";
import fastifyMysql from "@fastify/mysql";

import * as dotenv from "dotenv";
dotenv.config();
export default fp(async (fastify) => {
  fastify.register(fastifyMysql, {
    promise: true,
    connectionString:
      process.env.MYSQL_CONNECTION_STRING
  });
});

