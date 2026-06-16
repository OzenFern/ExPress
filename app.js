import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:3000`);
});

app.get("/", (req, res)=>{
  res.render("index.ejs");
})