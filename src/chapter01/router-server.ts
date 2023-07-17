import http, { IncomingMessage, ServerResponse } from "http";
import url from "node:url";
http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    const path = url.parse(req.url || "", true).pathname;
    res.setHeader("Content-Type", "text/html");

    // if (path === "/user") {
    //   user(req, res);
    // } else if (path === "/feed") {
    //   feed(req, res);
    // } else {
    //   notFond(req, res);
    // }

    if (path in urlMap) {
      urlMap[path](req, res);
    } else {
      notFond(req, res);
    }
  })
  .listen(3000, () => console.log("라우터를 만들어보자!"));

const user = (req: IncomingMessage, res: ServerResponse) => {
  const userInfo = url.parse(req.url || "", true).query;
  res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}}`);
};

const feed = (req: IncomingMessage, res: ServerResponse) => {
  res.end(`
  <ul>
    <li>
      picture1
    </li>
    <li>
      picture2
    </li>
    <li>
      picture3
    </li>
  </ul>`);
};

const notFond = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 404;
  res.end("404 Not Found");
};

interface UrlMap {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
}
const urlMap: UrlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user": user,
  "/feed": feed,
};
