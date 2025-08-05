import db from "../DATABASE.js"

const carrosNaoSairam = db.prepare('SELECT * FROM entrada_saida WHERE saiu IS NULL');
export function getCarrosNaoSairam(){
  return carrosNaoSairam.all();
}

const registrarEntradaPorPlaca = 'INSERT INTO entrada_saida (carro_funcionario_id, entrou, saiu) VALUES (?, ?, ?)';
export function postEntradaSaidaPorCarroFuncionario(carro_funcionarioId, saiu = null){
  const timestamp = new Date().toISOString();
  db.run(registrarEntradaPorPlaca,
    [carro_funcionarioId, timestamp, saiu]
  )
}