import GetUnidades from "../../../model/GetUnidades"

export default async function getUnidades(req, res){
    const getUnidades = new GetUnidades()

    const itunidades = await getUnidades.getItensUnidades()

    res.status(200).json(itunidades)
}