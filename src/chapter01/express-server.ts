import express from "express";
import url from "node:url";

const app: express.Express = express();
const port: number = 3000;

app.get("/", (_: express.Request, res: express.Response) => {
  res.end("Home");
});

app.get("/user", user);
app.get("/feed", feed);

function user(req: express.Request, res: express.Response) {
  const user = url.parse(req.url, true).query;
  res.json(`[user] name: ${user.name}, age: ${user.age}`);
}

function feed(_: express.Request, res: express.Response) {
  res.json(`<ul><li>picture 1</li><li>picture 2</li><li>picture 3</li></ul>`);
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
