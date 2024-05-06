import app from "./app.js";
import { MONGODB_URI, SECRET } from "./config.js";
import "./database.js";
import "./libs/initialSetup.js";

if(!MONGODB_URI) throw new Error("MONGO_URI missing");
if(!SECRET) throw new Error("SECRET missing");

app.listen(4000);
