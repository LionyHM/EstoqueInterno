import Layout from "../components/template/Layout";
import Cookies from "js-cookie";

export async function getServerSideProps(){
  const responseSectors = await fetch(process.env.URL + "consults/getSectors")
  const productsSectors = await responseSectors.json()

  const responseBaixas = await fetch(process.env.URL + "consults/getDowns")
  const productsBaixas = await responseBaixas.json()


    const respPerfil = await fetch(process.env.URL + "consults/getValidation")
    const perfil = await respPerfil.json()

  return{
    props: {
      productsSectors,
      productsBaixas,
      perfil
    }
  }
}

export default function Consulta(props) {

  let user = props.perfil.find(perfil => perfil.DS_NOME == Cookies.get("usuario") )

  return (
    user != undefined ?
    (
      user.CD_PERFIL == 3 ?
    <Layout 
    sectors={props.productsSectors}
     titulo="Configurações"
     subtitulo="Tela para realizar configurações"
     >
      <h3>Conteúdo</h3>
    </Layout>
    : <Layout 
     titulo="Sem Acesso"
     subtitulo="Usuário(a) sem acesso a tela"
     >
      <h3>Conteúdo</h3>
    </Layout>)
    :
    <Layout 
     titulo="Sem Acesso"
     subtitulo="Usuário(a) sem acesso a tela"
     >
      <h3>Conteúdo</h3>
    </Layout>
  )
}
