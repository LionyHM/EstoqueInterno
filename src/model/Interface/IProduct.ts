export default interface IProduct{
    codigo: number,
    date: string,
    sector: string,
    batch: number,
    qntd: number,
    unity: string,
    unityDescription: string,
    factor: number,
    codeProduct: number,
    productDescription: string,
    productDescriptionRes: string

    showProduct(cdMvtoEstoque: number):Promise<object>
    getProductsIn():Promise<object>
  
}