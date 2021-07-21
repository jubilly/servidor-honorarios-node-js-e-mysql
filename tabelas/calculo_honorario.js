var con = require('../connection-db'),
    sql;

function createTable(con){
    sql = "create table if not exists calc_honorario ("+
                    "id_calculo_honorario int not null auto_increment,"+
                    "primary key (id_calculo_honorario),"+
                    "nome varchar(255) null" +
                    "descricacao varchar(10000) null" +
                    "data_calculo date null" +
                    "fk_calc_honorario_usuario int" +
                    "foreign key(fk_calc_honorario_usuario) references usuario(id_usuario)"+
                ");";
    
    con.query(sql, function (error){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}

createTable(con);
