import MovDay from '../../../model/MovDay'

export default  async function consultMvtoDay(req, res) {

const showMovDay = await new MovDay

let consultMvtoDay:any = await showMovDay.showMvtoDay()

for(let i = 0; i < consultMvtoDay.length; i++){
    let result = await showMovDay.ifMvtoExist(consultMvtoDay[i].CD_MVTO_ESTOQUE)
    
    if(result){
        delete consultMvtoDay[i]
    }
}
consultMvtoDay = consultMvtoDay.filter(n => n)
  res.status(200).json(consultMvtoDay)
}
