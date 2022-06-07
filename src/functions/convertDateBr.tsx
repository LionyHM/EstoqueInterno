import dateFormat from 'dateformat'

export default function convertDateBr(date){


       /*  let dataAtual = dateFormat(Date.now(), "dd/mm/yyyy HH:MM:ss") */
        let dataAtual = dateFormat(date, "dd/mm/yyyy")

        return dataAtual
      
}