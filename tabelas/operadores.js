var con = require('../connection-db'),
    sql;

function createTable(con){
    sql = "create table if not exists operador ("+
                    "id_operador int not null auto_increment,"+
                    "nome_operador varchar(255) null,"+
                    "fk_calc_operador int null," +
                    "primary key (id_operador),"+
                    "foreign key(fk_calc_operador) references calc_honorario(id_calculo_honorario),"+
                    "valor varchar(5) null);";
    
    con.query(sql, function (error){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}

createTable(con);

