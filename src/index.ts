import express from "express";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log(`🚀 O servidor está executando na porta 3000`);
});
