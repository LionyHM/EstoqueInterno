import Product from "../../../model/Product"

export default  async function getProductsOut(req, res) {
  
  const getProductsOut = new Product()

  
      var listProductOut = await getProductsOut.getProductsOutDevolutions() 
  

      res.status(200).json(listProductOut)
    }