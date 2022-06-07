export default interface IMovDay{
    codigo: number

    showMvtoDay():Promise<object>
    ifMvtoExist(cdMvto: number):Promise<boolean>

}