import dateFormat from 'dateformat'

export default function convertDate(data = null){



        if(data != null){
                var dia = data.slice(0,2)
                var mes = data.slice(3,5)
                var ano = data.slice(6,10)
                var dataAtual = ano + '-' + mes + '-' + dia    

             return dataAtual
        }else{
             let dataAtual =  dateFormat(Date.now(), "yyyy-mm-dd HH:MM:ss")
             return dataAtual
        }
       /*  let dataAtual = dateFormat(Date.now(), "dd/mm/yyyy HH:MM:ss") */

      
}