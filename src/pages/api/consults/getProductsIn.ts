import Product from "../../../model/Product"
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

export default  async function getProductsIn(req, res) {
  await runMiddleware(req, res, cors)
  
  let consult = req.body.consult == undefined ? false : true
  const getProductsIn = new Product()
  var listProduct = ''
  if(consult){
    listProduct = await getProductsIn.getProductsInQntd()
  }else{
    listProduct = await getProductsIn.getProductsIn()

  }



      res.status(200).json(listProduct)
    }