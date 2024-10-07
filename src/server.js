import { app } from "./app.js";
import { connectDB } from "./data/database.js";


connectDB();
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
    console.log(process.env.PORT);
});
