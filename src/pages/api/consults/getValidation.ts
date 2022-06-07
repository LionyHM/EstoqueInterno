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

export default async function getValidation(req, res) {
    
  await runMiddleware(req, res, cors)




  let dados = await databaseMysql.select("DS_NOME", "CD_PERFIL").table("usuario")  

  res.status(200).json(dados)
   

}