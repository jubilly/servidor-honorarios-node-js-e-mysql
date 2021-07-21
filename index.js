var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 3000,
    con = require('./connection-db'),
    md5 = require('md5');;

var cors = require('cors');

console.log(port)
var server = app.listen(port, function(){
    server.address().address
    server.address().port
    console.log("Servidor funcionando");
});

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.get('/', (request, response) => {
  response.json( 'teste da rota index da api')
  console.log('teste da rota index da api')
});

function connectionSGBD (sql, response) {
    con.query(sql, function(error, rows, results){
      if(error){
        response.json(error);
      }
      else{
        console.log(rows)
        response.json(rows);
      }
    })
}

app.get('/usuario', (request, response) =>{
  var selectTable = `select * from usuario`;
  connectionSGBD(selectTable, response)
})


app.get('/home/:usuario', (request, response) =>{
  var usuario = request.params.usuario;
  var selectTable = `select * from usuario where id_usuario=${usuario}`;
  connectionSGBD(selectTable, response)
})

app.post('/register', (request, response) =>{
  var nome = request.body.nome,
    login = request.body.usuario,
    senha = md5(request.body.senha);
    selectTable = `insert into usuario (nome, login, senha) values ('${nome}', '${login}', '${senha}')`;
  connectionSGBD(selectTable, response)
})

app.post('/redinepassword', (request, response) => {
  var usuario = request.body.usuario, 
    novasenha = request.body.senha;

  var selectTable = `update usuario set senha = '${novasenha}' where login ='${usuario}' `;
  connectionSGBD(selectTable, response)
})


app.post('/login', function(request, response) {
  var login = request.body.usuario,
      senha = md5(request.body.senha);
  if (login && senha) {
    con.query(`select * from usuario where login = '${login}' and '${senha}'`, function(error, rows) {
      if(!!error){
        console.log('error');
      }else{
          response.send(rows);
      } 
    });

    }
});

app.post('/calculo', function(request, response) {
  var nome_calculo = request.body.nome_calculo,
      data_calculo = request.body.data_calculo,
      descricao_calculo = request.body.descricao_calculo;
      fk_calc_honorario_usuario = request.body.fk_calc_honorario_usuario;
  var SGBDcalculo = `insert into calc_honorario (fk_calc_honorario_usuario, nome, descricao, data_calculo) values (${fk_calc_honorario_usuario}, '${nome_calculo}', '${descricao_calculo}', '${data_calculo}')`;
  connectionSGBD(SGBDcalculo, response)
})

app.get('/getCalculo/:nome_calc', function(request, response){
  var nomeCal = request.params.nome_calc;
  console.log(nomeCal)
  var SGBDgetCalculo = `select * from calc_honorario where nome='${nomeCal}'`;
  connectionSGBD(SGBDgetCalculo, response)

})

app.get('/getAllHonorarios/:id_usuario', function(request, response){
  var id_usuario = request.params.id_usuario;
  console.log(id_usuario)
  var SGBDgetCalculo = `select id_calculo_honorario, nome, data_calculo, descricao FROM myhonorarios.calc_honorario where fk_calc_honorario_usuario= '${id_usuario}'`;
  connectionSGBD(SGBDgetCalculo, response)
})

app.get('/honorariosCalc/:fk_calc', function(request, response){
  var fk_calc = request.params.fk_calc;
  console.log(fk_calc);
  var SGBDgetHonorarios = `select entrada.nome_entrada, entrada.valor, entrada.index_control from entrada where fk_calc_entrada = ${fk_calc} union select saida.nome_saida, saida.valor, saida.index_control from saida where fk_calc_saida = ${fk_calc} union select operador.nome_operador, operador.valor, operador.index_control from operador where fk_calc_operador = ${fk_calc} union select calc_honorario.nome, calc_honorario.data_calculo, calc_honorario.descricao FROM calc_honorario where id_calculo_honorario = ${fk_calc}`; 
  connectionSGBD(SGBDgetHonorarios, response)
})


app.get('/honorarios/:index_control', function(request, response){
  var index_control = request.params.index_control;
  console.log(index_control);
  var SGBDgetHonorarios = `select * from entrada where index_control = ${index_control} union select * from saida where index_control = ${index_control} union select * from operador where index_control = ${index_control}`; 
  connectionSGBD(SGBDgetHonorarios, response)
})


app.get('/getEntradas/:fk_calc_entrada', function(request, response){
  var fk_calc_entrada = request.params.fk_calc_entrada;
  console.log(fk_calc_entrada)
  var SGBDgetEntrada = `SELECT * FROM myhonorarios.entrada where fk_calc_entrada = '${fk_calc_entrada}'`;
  connectionSGBD(SGBDgetEntrada, response)
})

app.get('/getSaidas/:fk_calc_saida', function(request, response){
  var fk_calc_saida = request.params.fk_calc_saida;
  console.log(fk_calc_saida)
  var SGBDgetsaida = `SELECT * FROM myhonorarios.saida where fk_calc_saida = '${fk_calc_saida}'`;
  connectionSGBD(SGBDgetsaida, response)
})

app.post('/entrada1', function(request, response) {
  var nome_entrada1 = request.body.nome_entrada1,
      valor_entrada1 = request.body.valor_entrada1,
      fk_calc = request.body.fk_calc,
      index_control = request.body.index_control;
  console.log(nome_entrada1)
  console.log(valor_entrada1)
  var SGBDentrada1 = `insert into entrada (nome_entrada, valor, fk_calc_entrada, index_control) values ('${nome_entrada1}', '${valor_entrada1}', ${fk_calc}, ${index_control})`;
  connectionSGBD(SGBDentrada1, response)
})

app.post('/entrada2', (request, response) =>{
  var nome_entrada2 = request.body.nome_entrada2,
      valor_entrada2 = request.body.valor_entrada2,
      fk_calc = request.body.fk_calc,
      index_control = request.body.index_control;
      console.log(nome_entrada2)
      console.log(valor_entrada2)
      console.log(fk_calc)
  var SGBDentrada2 = `insert into entrada (nome_entrada, valor, fk_calc_entrada, index_control) values ('${nome_entrada2}', '${valor_entrada2}', ${fk_calc}, ${index_control})`;
  connectionSGBD(SGBDentrada2, response)
})

app.post('/saida', (request, response) =>{
  var nome_saida = request.body.nome_saida,
      valor_saida = request.body.valor_saida,
      fk_calc = request.body.fk_calc,
      index_control = request.body.index_control;
      console.log(nome_saida)
      console.log(valor_saida)
      console.log(fk_calc)
  var SGBDsaida = `insert into saida (nome_saida, valor, fk_calc_saida, index_control) values ('${nome_saida}', '${valor_saida}', ${fk_calc}, ${index_control})`;
  connectionSGBD(SGBDsaida, response)
})

app.post('/operador', (request, response) =>{
  var nome_operador = request.body.operador,
      fk_calc = request.body.fk_calc,
      index_control = request.body.index_control;
  console.log(nome_operador)
  console.log(fk_calc)
  var SGBDoperador = `insert into operador (nome_operador, valor, fk_calc_operador, index_control) values ('${nome_operador}', '${nome_operador}', ${fk_calc}, ${index_control})`;
  connectionSGBD(SGBDoperador, response)
})