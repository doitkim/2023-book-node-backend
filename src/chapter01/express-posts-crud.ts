import express from "express";
import { title } from "process";

const app: express.Express = express();

interface Post {
  id: number;
  title: string;
  name: string;
  text: string;
  createDt: Date;
  updateDt?: Date;
}

interface UpdatePost {
  title?: string;
  text?: string;
  updateDt?: Date;
}

let posts: Post[] = [];

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// 전체 포스트 조회
app.get("/", (req: express.Request, res: express.Response) => {
  if (posts.length === 0) {
    res.status(404).json({ message: "NOT FOUND" });
    return;
  }

  res.status(200).json({ message: "success", contents: posts });
});

// 포스트 생성
app.post("/", (req: express.Request, res: express.Response) => {
  const { title, name, text } = req.body;
  if (!title || !name || !text) {
    res.status(400).json({ message: "BAD REQUEST" });
    return;
  }

  if (posts.find((post) => post.title === title)) {
    res.status(409).json({ message: "CONFLICT" });
    return;
  }

  const post: Post = {
    id: posts.length + 1,
    title,
    name,
    text,
    createDt: new Date(),
  };
  posts.push(post);
  res.status(201).json({ message: "created success", contents: post });
});

// 특정 포스트 조회
app.get("/posts/:id", (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  const post: Post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ message: "NOT FOUND" });
  }
  res.status(200).json({ message: "success", contents: post });
});

// 특정 포스트 수정
app.patch("/posts/:id", (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  const post: Post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404).json({ message: "NOT FOUND" });
    return;
  }

  const { title, text } = req.body;
  const body: UpdatePost = {
    title,
    text,
    updateDt: new Date(),
  };

  post.title = body.title;
  post.text = body.text;
  (post.updateDt = new Date()),
    res.status(200).json({ message: "modify success", contents: post });
});

// 포스트 삭제
app.delete("/posts/:id", (req: express.Request, res: express.Response) => {
  const id = Number(req.params.id);
  const filteredPosts: Post[] = posts.filter((post) => post.id !== +id);
  const isLengthChanged: boolean = posts.length !== filteredPosts.length;

  posts = filteredPosts;

  if (isLengthChanged) {
    res.status(200).json({ message: "delete success" });
    return;
  }
  res.status(400).json({ message: "NOT CHANGED" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
