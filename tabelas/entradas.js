var con = require('../connection-db'),
    sql;

function createTable(con){
    sql = "create table if not exists entrada ("+
                    "id_entrada int not null auto_increment,"+
                    "nome_entrada varchar(255) null,"+
                    "fk_calc_entrada int null," +
                    "primary key (id_entrada),"+
                    "foreign key(fk_calc_entrada) references calc_honorario(id_calculo_honorario),"+
                    "valor real null);";
    
    con.query(sql, function (error){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}

createTable(con);

