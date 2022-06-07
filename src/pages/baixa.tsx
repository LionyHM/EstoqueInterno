import Layout from "../components/template/Layout";
import Cookies from "js-cookie";

export async function getServerSideProps(){
  const response = await fetch(process.env.URL + "consults/getProductsMV")
  const productsMV = await response.json()

  const responseUnidades = await fetch(process.env.URL + "consults/getUnidades")
  const productsUnidades = await responseUnidades.json()

  const responseItUnidades = await fetch(process.env.URL + "consults/getItUnidades")
  const productsItUnidades = await responseItUnidades.json()

  const responseSectors = await fetch(process.env.URL + "consults/getSectors")
  const productsSectors = await responseSectors.json()

  const responseQntd = await fetch(process.env.URL + "consults/getProductsEstoque")
  const productsQntd = await responseQntd.json()

  const responseOutsQntd = await fetch(process.env.URL + "consults/getProductsOutsEstoque")
  const productsOutsQntd = await responseOutsQntd.json()
  
  const respPerfil = await fetch(process.env.URL + "consults/getValidation")
  const perfil = await respPerfil.json()

  return{
      props: {
          productsMV,
          productsUnidades,
          productsItUnidades,
          productsSectors,
          productsQntd,
          productsOutsQntd,
          perfil
      }
  }

}

export default function Baixa(props) {
  let user = props.perfil.find(perfil => perfil.DS_NOME == Cookies.get("usuario"))
  return (
    user != undefined ?
    (
      user.CD_PERFIL > 1 ?
      <Layout titulo="Baixas" 
      subtitulo="Tela para realizar baixa de produtos ao estoque"
      batch={props.productsMV} unidades={props.productsUnidades}
      itUnidades={props.productsItUnidades} sectors={props.productsSectors}
      qntEstoque={props.productsQntd}
      productsOutsQntd={props.productsOutsQntd}>    
        <h1>Baixa</h1>
      </Layout>
      :
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
