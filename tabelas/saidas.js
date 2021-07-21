var con = require('../connection-db'),
    sql;

function createTable(con){
    sql = "create table if not exists saida ("+
                    "id_saida int not null auto_increment,"+
                    "nome_saida varchar(255) null,"+
                    "fk_calc_saida int null,"+
                    "primary key (id_saida),"+
                    "foreign key(fk_calc_saida) references calc_honorario(id_calculo_honorario),"+
                    "valor real null);";
    
    con.query(sql, function (error){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}

createTable(con);

