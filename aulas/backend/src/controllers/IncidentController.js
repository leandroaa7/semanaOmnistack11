const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query; //paginação sendo a variavel page tem por padrao o valor 1

        const [count] = await connection('incidents')
            .count(); // count entra dentro de colchetes pois é para pegar o primeiro valor

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //para retornar todos os dados da ong junto ao incidente
            .limit(5) //retorna apenas 5 registros
            .offset((page - 1) * 5) //pula 5 registros por página
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first(); //retorna apenas o primeiro valor;

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: "Operation not permitted. " }) //status não autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send() //status sem conteúdo
    }
}