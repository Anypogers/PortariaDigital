import db from "../DATABASE.js"

const funcionarioPorId = db.prepare('SELECT * FROM funcionarios WHERE id = ?')
export function getFuncionarioPorId(id){
  return funcionarioPorId.get(id);
}

const funcionarioPorPlaca = db.prepare(`
  SELECT funcionarios.*
  FROM funcionarios
  JOIN carro_funcionario
    ON funcionarios.id = carro_funcionario.funcionario_id
  WHERE carro_funcionario.placa = ?
`);
export function getFuncionarioPorPlaca(placa){
  return funcionarioPorPlaca.all(placa);
}