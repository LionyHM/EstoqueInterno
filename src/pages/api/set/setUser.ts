import SetJust from "../../../model/SetJust"
import Cors from 'cors'
import { databaseMysql } from "../../../database/Mysql/Db"
import convertDate from "../../../functions/convertDate"
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

export default async function setDevolution(req, res) {
  await runMiddleware(req, res, cors)
  let usuario = req.body.usuario
  let senha = req.body.senha
  let perfil = parseInt(req.body.perfil)
  
  let senha_crypto = await crypto.createHash("md5").update(senha).digest("hex")
  
  if(req.method == "POST"){
    await databaseMysql.insert({"CD_PERFIL": perfil,"DS_NOME": usuario,"SENHA": senha_crypto, "DATA_CRIACAO": convertDate(), "P_LOGIN": 0}).table("usuario")
    
  }else if(req.method == "PUT"){
        if(perfil == 9){
           try{
            await databaseMysql.update({"SENHA": senha_crypto, DATA_MOD: convertDate(),  "P_LOGIN": 1}).where("DS_NOME","=", usuario).table("usuario")
           }catch(e){
            console.log(e)
           }
        }else{
            await databaseMysql.update({"SENHA": senha_crypto, DATA_MOD: convertDate(), "CD_PERFIL": perfil, "P_LOGIN": 0}).where("DS_NOME","=", usuario).table("usuario")
        }

    }

    res.end()

}