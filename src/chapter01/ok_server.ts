import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    res.setHeader("Content-Type", "text/html");
    res.end("ok");
  }
);

server.listen(3000, () => console.log("ok server start!"));
