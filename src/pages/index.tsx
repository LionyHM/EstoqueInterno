import Layout from "../components/template/Layout";
import Cookies from "js-cookie"

export async function getServerSideProps(){

  const response = await fetch(process.env.URL + 'consults/consultMvtoDay')
  const batchPending = await response.json()

  const responseIn = await fetch(process.env.URL + "consults/getProductsIn")
  const productIn = await responseIn.json()

  const responseOut = await fetch(process.env.URL + "consults/getProductsOut")
  const productOut = await responseOut.json()

  const respPerfil = await fetch(process.env.URL + "consults/getValidation")
  const perfil = await respPerfil.json()
  
  return{ 
      props:
      {
          batchPending,
          productIn,
          productOut,
          perfil
      } 
  }
}

export default function Home(props) {
  
  return (
    <Layout titulo="Página Inicial"
     subtitulo="Sistema de estoque HEJSN!"
      batch={props.batchPending}
      productIn={props.productIn}
      productOut={props.productOut}
      perfil={props.perfil}
      >      
    </Layout>
  )
}
