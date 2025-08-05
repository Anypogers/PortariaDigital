import db from "../DATABASE.js"

const carroPorId = db.prepare('SELECT * FROM carros WHERE id = ?')
export function getCarroPorId(id){
  return carroPorId.get(id);
}