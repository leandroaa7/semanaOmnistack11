## Observações
- para fazer uma migrations basta digitar o comando `npx migrate:lates`
- para desfazer a migrations basta digitar o comando `npx migrate:rollback`
- para listar as migrations feitas digite o comando `npx migrate:status`
- No header da criação de um caso/incident estou passando um Authorization com o valor do id da ONG
- a rota /incidents tem um sistema de paginação. logo, para acessar a segunda página basta acessar /incidents?page=2