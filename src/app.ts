import express, { Request, Response } from "express";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors())

console.log(process.env.DB_URL,"mohii");


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})

export default app