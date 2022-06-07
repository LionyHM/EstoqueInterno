import Layout from "../components/template/Layout";

export async function getServerSideProps(){
  const responseSectors = await fetch(process.env.URL + "consults/getSectors")
  const productsSectors = await responseSectors.json()

  const responseSectorsEstoque = await fetch(process.env.URL + "consults/getSectors",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({    
          setor: true
      })
    }
  )
  const productsSectorsEstoque = await responseSectorsEstoque.json()

  const responseBaixas = await fetch(process.env.URL + "consults/getDowns")
  const productsBaixas = await responseBaixas.json()


  return{
    props: {
      productsSectors,
      productsBaixas,
      productsSectorsEstoque
    }
  }
}

export default function Consulta(props) {
  return (
    <Layout 
    sectors={props.productsSectors}
     titulo="Consulta por Setor"
     subtitulo="Tela de Consulta por Setor"
     productsBaixas={props.productsBaixas}
     productsSectorsEstoque={props.productsSectorsEstoque}>
      <h3>Conteúdo</h3>
    </Layout>
  )
}
