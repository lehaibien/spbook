import Elysia from "elysia";
import { authorModule } from "./authors";
import { bookModule } from "./books";
import { categoryModule } from "./categories";
import { publisherModule } from "./publishers";
import { userModule } from "./users";

const route = new Elysia({ prefix: "/api" })
  .use(bookModule)
  .use(authorModule)
  .use(categoryModule)
  .use(publisherModule)
  .use(userModule);

export { route as APIRoute };
