import { databaseMysql } from '../../../database/Mysql/Db'
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

export default async function getConsumSector(req, res) {
    
    await runMiddleware(req, res, cors)

    let dados = await databaseMysql.raw(`SELECT s.DS_PRODUTO, s.LOTE,s.setor, s.DATA_SAIDA,DATA_DEVOLUCAO,
    sum(case when s.ATIVO = 'N' then 1 ELSE 0 END) CONSUMO, 
    sum(case when  s.ativo = 'S' AND DATA_DEVOLUCAO IS NULL then 1 ELSE 0 END) NAODEVOLVIDO,
    sum(case when  s.ativo = 'S' AND DATA_DEVOLUCAO IS not NULL then 1 ELSE 0 END) DEVOLVIDO
    FROM saidas_estoque AS s
    WHERE (s.DATA_SAIDA BETWEEN '${req.body.d1} 00:00:00' AND '${req.body.d2} 23:59:59')
    GROUP BY ds_produto, setor`)





    res.status(200).json(dados[0])
   

}