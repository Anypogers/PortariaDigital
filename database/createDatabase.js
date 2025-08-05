import db from './DATABASE.js';

db.exec(`
CREATE TABLE IF NOT EXISTS "funcionarios" (
  "id" INTEGER NOT NULL UNIQUE,
  "nome" VARCHAR NOT NULL,
  PRIMARY KEY("id")
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS "carros" (
  "id" INTEGER NOT NULL UNIQUE,
  "modelo" VARCHAR NOT NULL,
  "marca" TEXT NOT NULL,
  "tipo" VARCHAR NOT NULL,
  PRIMARY KEY("id")
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS "carro_funcionario" (
  "id" INTEGER NOT NULL UNIQUE,
  "carro_id" INTEGER NOT NULL,
  "funcionario_id" INTEGER NOT NULL,
  "placa" VARCHAR NOT NULL,
  PRIMARY KEY("id"),
  FOREIGN KEY ("carro_id") REFERENCES "carros"("id"),
  FOREIGN KEY ("funcionario_id") REFERENCES "funcionarios"("id")
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS "entrada_saida" (
  "id" INTEGER NOT NULL UNIQUE,
  "carro_funcionario_id" INTEGER NOT NULL,
  "entrou" DATETIME NOT NULL,
  "saiu" DATETIME,
  PRIMARY KEY("id"),
  FOREIGN KEY ("carro_funcionario_id") REFERENCES "carro_funcionario"("id")
);
`);
