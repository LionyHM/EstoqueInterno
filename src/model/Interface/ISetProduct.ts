export default interface ISetProduct{
    cdMvto: number
    cdProduto: number
    dsProduto : string
    qntdTotal: number
    unidade: string
    setor: number  
    lote: string  
    origem: number  
    
    getProductInventory(): void
    setProduct():Promise<boolean>
    updateProduct(): Promise<boolean>

}