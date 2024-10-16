import express from "express";
import {
  buildTree,
  extractNodesAndLinks,
  getDependencies,
} from "./dependencyTree";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/analyze", (req, res) => {
  const sourceDir = req.query.sourceDir as string;
  const rootModule = req.query.rootModule as string;

  const dependencies = getDependencies(sourceDir);
  const dependencyTree = buildTree(dependencies, rootModule);

  res.json(extractNodesAndLinks(dependencyTree));
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});