import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { User } from "./schemas/User";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-literay-lanes";

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
  //@ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: `mongoose`,
    url: databaseURL,
    //TODO seeding here
  },

  lists: createSchema({
    // Schema items go in here
    User,
  }),

  ui: {
    //change role
    isAccessAllowed: () => true,
  },
});
