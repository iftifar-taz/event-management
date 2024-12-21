import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import eventsRoutes from "./routes/events";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import cors from "cors";

// Initialize Express app
const app: Express = express();

// CORS setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Middleware to parse incoming JSON requests
app.use(express.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_STRING,
    }),
  })
);

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", requiresAuth, usersRoutes);
app.use("/api/events", requiresAuth, eventsRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found!"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMesage = "An unknown error occurred!";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMesage = error.message;
  }
  res.status(statusCode).json({ error: errorMesage });
});

export default app;
