var Service = require('node-windows').Service;
// Criando um novo objeto do Serviço
var svc = new Service({
//Nome do servico
name:'ESTOQUEHEJSNHIGIENIZACAO',
//Descricao que vai aparecer no Gerenciamento de serviço do Windows
description: 'Serviço da aplicação de estoque da hotelaria e cme',
//caminho absoluto do seu script
script: 'C:\\App\\Estoque\\src\\pages\\autenticacao.tsx'
});
svc.on('install',function(){
svc.start();
});
// instalando o servico
svc.install();