var con = require('../connection-db'),
    sql;  

function createTable(con){
    sql = "create table if not exists usuario ("+
                    "id_usuario int not null auto_increment,"+
                    "login varchar(255) not null,"+
                    "senha varchar(255) not null,"+
                    "nome varchar(255) not null,"+
                    "primary key (id_usuario));";
    
    con.query(sql, function (error){
        if(error) return console.log(error);
        console.log('criou a tabela!');
    });
}

createTable(con);

