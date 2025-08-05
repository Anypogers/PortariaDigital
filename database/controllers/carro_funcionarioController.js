import db from "../DATABASE.js"

const carroFuncionarioPorId = db.prepare('SELECT * FROM carro_funcionario WHERE id = ?')
export function getCarroFuncionarioPorId(id){
  return carroFuncionarioPorId.get(id);
}

const carroPorFuncionarioId = db.prepare('SELECT * FROM carro_funcionario WHERE funcionario_id = ?')
export function getCarroPorFuncionarioId(funcionarioId){
  return carroPorFuncionarioId.all(funcionarioId);
}

const carro_funcionarioPorPlaca = db.prepare('SELECT * FROM carro_funcionario WHERE placa = ?')
export function getCarroFuncionarioPorPlaca(placa){
  return carro_funcionarioPorPlaca.get(placa)
}