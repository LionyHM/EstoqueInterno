import SetJust from "../../../model/SetJust"
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

    const produto = req.body.produto
    const setor = req.body.setor
    const lote = req.body.lote
    const usuario = req.body.usuario
    const setorEstoque = req.body.setorEstoque

    const produtoQntd = req.body.produtoQntd
    const cateJust = req.body.cateJust
    const justif = req.body.justif
    const codJust = req.body.codJust
    const justCdSetor = req.body.justCdSetor
    const unidade = req.body.unidade

    const setDevolution = new SetJust()

  console.log(produto + ' - ' +  setor + ' - ' +  produtoQntd + ' - ' +  cateJust + ' - ' +  justif + ' - ' +  codJust + ' - ' +  justCdSetor + ' - ' + lote + ' - ' + usuario + ' - ' + setorEstoque)

        var just = await setDevolution.setJust(produto, setor, produtoQntd, cateJust, justif, codJust, justCdSetor,lote,unidade,usuario,setorEstoque)


        res.status(200).json(just)
        res.end
    

}