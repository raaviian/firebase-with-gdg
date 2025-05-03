import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import itemsRouter from './routes/items.js'


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// 1) Serve everything in /public
app.use(express.static(path.join(__dirname, "public")));
app.use('/items', itemsRouter);
// 2) Optional: serve your login.html at the root
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
