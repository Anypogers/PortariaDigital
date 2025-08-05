import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCarroFuncionarioPorId, getCarroFuncionarioPorPlaca } from '../database/controllers/carro_funcionarioController.js';
import { getCarroPorId } from '../database/controllers/carrosController.js';
import { getCarrosNaoSairam } from '../database/controllers/entrada_saidaController.js';
import { getFuncionarioPorId } from '../database/controllers/funcionariosController.js';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(cors());

app.get('/api/carros-atuais', (req, res) => {
  const carros = getCarrosNaoSairam();
  res.json(carros);
});

app.get('/api/placa-do-carro', (req, res) => {
  const id = req.query.id
  const placa = getCarroFuncionarioPorId(id);
  res.json(placa)
});

app.get('/api/funcionario-por-id', (req, res) => {
  const id = req.query.id
  const funcionario = getFuncionarioPorId(id)
  res.json(funcionario)
});

app.get('/api/carro-por-id', (req, res) => {
  const id = req.query.id
  const funcionario = getCarroPorId(id)
  res.json(funcionario)
});

app.post('/api/registrar-entrada', (req, res) => {
  const { placa } = req.body;
  try {
    const carroFuncionario = getCarroFuncionarioPorPlaca(placa);
    
    console.log(carroFuncionario)

    if (!carroFuncionario) {
      return res.status(404).json({ error: `Carro com placa "${placa}" não encontrado` });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro interno no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
