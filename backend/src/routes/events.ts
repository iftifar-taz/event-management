import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).json({});
  } catch (err: unknown) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: "Error fetching users", details: err.message });
    }
    res.status(500).json({ error: "Error fetching users", details: "Unknown" });
  }
});

export default router;
