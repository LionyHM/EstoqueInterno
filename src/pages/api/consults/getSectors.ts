import GetSectors from "../../../model/GetSectors"
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

export default async function getSectors(req, res){
    await runMiddleware(req, res, cors)
    const valid = req.body.setor != undefined ? true : false
    const getSectors = new GetSectors()
    let sectors:any = ""
    if(valid){
        sectors = await getSectors.getSectorsEstoque()
    }else{
        sectors = await getSectors.getSectors()

    }

    res.status(200).json(sectors)
}