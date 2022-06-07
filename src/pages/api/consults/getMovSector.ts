import { databaseMysql } from "../../../database/Mysql/Db"
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }

export default async function getMovSector(req, res){
    await runMiddleware(req, res, cors)

    const dados = await databaseMysql.select("DS_PRODUTO","LOTE","CD_PRODUTO","DATA_SAIDA","DATA_DEVOLUCAO","SETOR","USUARIO_RECEPTOR").where("ATIVO", "=","S").orderBy("DS_PRODUTO").table("saidas_estoque")

  
    res.status(200).json(dados)
}