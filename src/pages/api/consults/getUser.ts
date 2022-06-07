import { databaseMysql } from '../../../database/Mysql/Db'
import Cors from 'cors'
import crypto from "crypto"

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

export default async function getUser(req, res) {  
  await runMiddleware(req, res, cors)

  let senha_crypto = await crypto.createHash("md5").update(req.body.senha).digest("hex")
  let dados = await databaseMysql.select()
                                  .where("DS_NOME", "=", req.body.email)
                                  .andWhere("SETOR","=", req.body.setor)
                                  .andWhere("SENHA", "=", senha_crypto)
                                  .table("usuario")  

  res.status(200).json(dados)   

}