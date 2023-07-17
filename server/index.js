import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";

//Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//File Storage Congigurations

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb= (null, "public/assets");
    },
    filename: function(req,file,cd){
        cb(null, file.originalname)
    }
}); //got from multer documentation
const upload = multer({storage: storage});

//Routes with files
app.post("/auth/register", upload.single('picture'), register);


//routes
app.use("/auth/", authRoutes);


//Mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
}).catch(err => console.error(`${err} did not connect`));