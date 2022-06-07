import SetJust from "../../../model/SetJust"
import Cors from 'cors'
import { databaseMysql } from "../../../database/Mysql/Db"
import convertDate from "../../../functions/convertDate"

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

export default async function setDevolution(req, res) {
    
    await runMiddleware(req, res, cors)
    let especie = req.body.especie
    let classe = req.body.classe
    console.log(req.body.methodConfig)

    if(req.body.methodConfig == "POST"){
        await databaseMysql.insert({CD_ESPECIE: parseInt(especie), CD_CLASSE: parseInt(classe), DATA_CRIACAO: convertDate()}).table("config")

    }else if(req.body.methodConfig == "DELETE"){
        await databaseMysql.delete().where("CD_ESPECIE","=", parseInt(especie)).andWhere("CD_CLASSE","=", parseInt(classe)).table("config")
    }

    res.end()

}