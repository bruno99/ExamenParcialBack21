import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { postBook } from "./controllers/postBook.js";
import { postFree } from "./controllers/postFree.js";
import { getFreeSeats } from "./controllers/getFreeSeats.ts";

const router = new Router();

const status = (ctx: any) => {
  try {
    ctx.response.status = 200;
    ctx.response.body = "OK";
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = "Server Error";
  }
};

router.get("/status", status)
      .get("/freeSeats/:ID", getFreeSeats);

router.post("/book", postBook)
      .post("/free", postFree)
export { router as default };
