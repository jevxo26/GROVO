import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "User api is not working",
    tiemstamp: new Date(),
  });
});

export const userRouter = router;
