import SetDevolution from "../../../model/SetDevolution"
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

export default async function setDevolution(req, res) {
    
    await runMiddleware(req, res, cors)

    const cdSaida = req.body.saida
    const quantidade = req.body.quantidade
    const setor = req.body.setor
    const lote = req.body.lote
    const setorEstoque = req.body.setorEstoque


    const setDevolution = new SetDevolution()

        var devolution = await setDevolution.setDateDevolution(cdSaida, setor, quantidade,lote,setorEstoque)

    if(devolution){
      res.status(200).json(devolution)
    }

}