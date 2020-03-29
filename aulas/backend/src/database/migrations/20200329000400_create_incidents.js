exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments() // chave primária com auto increment
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        
        table.string('ong_id').notNullable();
        //chave estrangeira referenciando a tabela ongs
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function (knex) {
    knex.schema.dropTable('incidents');
};
