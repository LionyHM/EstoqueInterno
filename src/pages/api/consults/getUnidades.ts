import GetUnidades from "../../../model/GetUnidades"

export default async function getUnidades(req, res){
    const getUnidades = new GetUnidades()

    const unidades = await getUnidades.getUnidades()

    res.status(200).json(unidades)
}