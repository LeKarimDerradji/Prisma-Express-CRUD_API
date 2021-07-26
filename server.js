const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies
app.use(express.json()); // to support JSON-encoded bodies

app.get("/feed", async (req, res) => {
  const posts = await prisma.posts.findMany();
  res.json(posts);
});
app.post("/post", async (req, res) => {
  console.log(req.body);
  const { title, content, authorEmail } = req.body;
  const post = await prisma.posts.create({
    data: {
      title,
      content,
      published: false,
      users: {
        connect: { email: authorEmail },
      },
      createdAt: new Date().toISOString(),
    },
  });
  res.json(post);
});
app.put("/publish/:id", async (req, res) => {
  const id  = Number(req.params.id);
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  });
  res.json(post);
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  res.json(user);
});

app.delete("/posts/:id", async (req, res) => {
  const  id = Number(req.params.id); 
  const post = await prisma.posts.delete({
    where: {
       id: id,
    },
  });
  res.json(post);
});
const server = app.listen(3003);
