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

export default async function getUserProdutive(req, res) {
    
    await runMiddleware(req, res, cors)

    let dados = await databaseMysql.raw(`SELECT *, COUNT(*) as QUANTIDADE,SUM(quantidade) as TOTALQUANTIDADE FROM movimentacao as m 
    WHERE m.USUARIO_IMPORTACAO = '${req.body.nameUser}'
    AND (m.DATA_MVTO BETWEEN '${req.body.d1} 00:00:00' AND '${req.body.d2} 23:59:59')
    GROUP BY m.tp_movimentacao`)





    res.status(200).json(dados[0])
   

}