export default function MvtoLasts(props){
    let arrIn:any = []
    let arrOut:any = []
    
    function renderIn(){           
        props.productIn.map((r, i) => {
            arrIn.push(      
                <tr key={r.DATA_MVTO + r.CD_MVTO + i} style={{fontSize: "12px"}} className="w-1/2 dark:bg-gray-500">
                    <td>
                        <div >                            
                            <div>
                                <p>{r.CD_PRODUTO}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p> {r.DS_PRODUTO} </p>
                    </td>
                    <td> <span> {r.QUANTIDADE} </span> </td>
                    <td> {r.UNIDADE} </td>
                    <td> {r.ORIGEM} </td>
                    <td className="p-2 cursor-pointer text-center text-green-600 dark:text-green-200 font-bold"> 
                        {`${r.DATA_MVTO.slice(8,10)}/${r.DATA_MVTO.slice(5,7)}/${r.DATA_MVTO.slice(0,4)} ${r.DATA_MVTO.slice(11)}`}   
                    </td>
                </tr>
            )
        })

        return arrIn
    }
    
    function renderOut(){           
        props.productOut.map((r, i) => {

            arrOut.push(
                <tr key={r.DATA_SAIDA + r.CD_PRODUTO + i} style={{fontSize: "12px"}} className="w-1/2 dark:bg-gray-500">
                    <td className="text-center">
                        <div>                            
                            <div>
                                <p>{r.CD_PRODUTO}</p>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p> {r.DS_PRODUTO} </p>
                    </td>
                    <td> <span> {r.QUANTIDADE} </span> </td>
                    <td> {r.SETOR} </td>
                    <td className="p-2 cursor-pointer text-center text-green-600 dark:text-green-200 font-bold"> 
                        {`${r.DATA_SAIDA.slice(8,10)}/${r.DATA_SAIDA.slice(5,7)}/${r.DATA_SAIDA.slice(0,4)} ${r.DATA_SAIDA.slice(11)}`}   
                    </td>
                </tr>
            )
        })


        return arrOut
    }


    return(
        <div className={`
            justify-around
            flex
            flex-wrap
            mt-6 xl:mt-10
        `}> 
            <div className='overflow-x-auto h-68'>
                <h2 className="text-xl xl:mt-6 text-center">Entradas Recentes</h2>
                    <table className='rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                        <thead className="bg-gray-900 dark:bg-gray-600">
                            <tr className="text-white text-left" style={{fontSize: "14px"}}>
                                <th className="font-semibold uppercase px-4 py-2"> Código </th>
                                <th className="font-semibold uppercase px-4 py-2"> Produto </th>
                                <th className="font-semibold uppercase px-4 py-2 text-center"> Quantidade </th>
                                <th className="font-semibold uppercase px-4 py-2 text-center"> Unidade </th>
                                <th className="font-semibold uppercase px-4 py-2 text-center"> Origem </th>
                                <th className="font-semibold uppercase px-4 py-2"> Data </th>
                            </tr>
                        </thead>
                        <tbody className="add_item_list h-20 divide-y divide-gray-200 text-center">                
                        {renderIn()}
                        </tbody>
                    </table>
            </div>
            <div className='overflow-x-auto h-68'>
                <h2 className="text-xl lg:mt-6 text-center">Saídas Recentes</h2>
                    <table className='rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                        <thead className="bg-gray-900 dark:bg-gray-600">
                            <tr className="text-white text-left" style={{fontSize: "13px"}}>
                                <th className="text-left font-semibold uppercase px-4 py-2"> Código </th>
                                <th className="font-semibold uppercase px-4 py-2"> Produto </th>
                                <th className="font-semibold uppercase px-4 py-2 text-center"> Quantidade </th>
                                <th className="font-semibold uppercase px-4 py-2 text-center"> Destino </th>
                                <th className="font-semibold uppercase px-4 py-2"> Data </th>
                            </tr>
                        </thead>
                        <tbody className="add_item_list h-20 divide-y divide-gray-200 text-center">                
                            {renderOut()}
                        </tbody>
                    </table>
            </div>    
        </div>
    )
}