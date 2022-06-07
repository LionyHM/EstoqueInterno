import Layout from "../components/template/Layout";
import Cookies from "js-cookie";

export async function getServerSideProps(){
  const responseSectors = await fetch(process.env.URL + "consults/getDevolutions")
  const productsSectors = await responseSectors.json()

  const responseDevolution = await fetch(process.env.URL + "consults/getProductsOutDevolutions")  
  const productsDevolution = await responseDevolution.json()
  
  const respPerfil = await fetch(process.env.URL + "consults/getValidation")
  const perfil = await respPerfil.json()

  return{
    props: {
      productsSectors,
      productsDevolution,
      perfil
    }
}

} 

export default function Notificacoes(props) {
  let user = props.perfil.find(perfil => perfil.DS_NOME == Cookies.get("usuario"))
  return (
    user != undefined ?
    (
      user.CD_PERFIL > 1 ?
    <Layout titulo="Devoluções" 
    subtitulo="Tela para realizar devoluções de produtos ao estoque"
    productsSectors={props.productsSectors}
    productsDevolution={props.productsDevolution}>    
      <h1>Devoluções</h1>
    </Layout> : 
        <Layout 
        titulo="Sem Acesso"
        subtitulo="Usuário(a) sem acesso a tela"
        >
         <h3>Conteúdo</h3>
       </Layout>
    )
    :
    <Layout 
    titulo="Sem Acesso"
    subtitulo="Usuário(a) sem acesso a tela"
    >
      <h3>Conteúdo</h3>
    </Layout>
  )
}
