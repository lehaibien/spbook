import "dotenv/config";
import { cors } from "@elysiajs/cors";
import openapi, { fromTypes } from "@elysiajs/openapi";
import { opentelemetry } from "@elysiajs/opentelemetry";
import { swagger } from "@elysiajs/swagger";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { createContext } from "@spbook/api/context";
import { appRouter } from "@spbook/api/routers/index";
import { auth } from "@spbook/auth";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { Elysia, redirect } from "elysia";
import logixlysia from "logixlysia";
import { APIRoute } from "./modules/route";

new Elysia()
  .use(
    logixlysia({
      config: {
        showStartupMessage: true,
        startupMessageFormat: "banner",
        timestamp: {
          translateTime: "yyyy-mm-dd HH:MM:ss.SSS",
        },
        logFilePath: `./logs/${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}.log`,
        ip: true,
        customLogFormat:
          "🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}",
      },
    })
  )
  .use(
    openapi({
      references: fromTypes(),
    })
  )
  .use(
    swagger({
      exclude: ["/", "/trpc/*", "/openapi/*", "/swagger/*"],
      autoDarkMode: true,
      documentation: {
        info: {
          title: "Spbook API",
          description: "Spbook API",
          version: "1.0.0",
          license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
          },
          contact: {
            name: "Spbook",
            url: "https://github.com/lehaibien",
          },
        },
      },
      scalarConfig: {
        layout: "modern",
        theme: "deepSpace",
      },
    })
  )
  .use(
    opentelemetry({
      spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())],
    })
  )
  .use(
    cors({
      origin: process.env.CORS_ORIGIN || "",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  )
  // .mount("/api/auth", auth.handler)
  .use(APIRoute)
  .all("/api/auth/*", async (context) => {
    const { request, status } = context;
    if (["POST", "GET"].includes(request.method)) {
      return await auth.handler(request);
    }
    return status(405);
  })
  .all("/trpc/*", async (context) => {
    const res = await fetchRequestHandler({
      endpoint: "/trpc",
      router: appRouter,
      req: context.request,
      createContext: () => createContext({ context }),
    });
    return res;
  })
  .get("/", () => redirect("/swagger"))
  .listen(3000);
