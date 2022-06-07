import GetDevolutions from "../../../model/GetDevolutions"

export default async function getDevolutions(req, res){
    const sectorDev =  new GetDevolutions
    const sectors = await sectorDev.getDevolutionsDatabase()

    res.status(200).json(sectors)

}