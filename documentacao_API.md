# ❗ Documentação da API 

## Rotas de filmes

`GET: /filmes` - Retorna todos os filmes na base de dados.

`POST: /filme` - Insere um filme com o **body** no formato: 
```bash
{ 
    "nome": "A fuga das galinhas",
    "genero": "Animação",
    "plataformaId": 1
}
```
`PATCH: /filme/:id/assistido` - Atualiza um filme para assistido e insere uma nota, se desejado, através do **body**:
```bash
{
    "nota": "qualquer coisa aqui..."
}
```
`DELETE: /filme/:id` - Deleta um filme da lista

`GET: /filmes/genero` - Retorna a quantidade de filme por genero.

`GET: filmes/genero?id=1` - Quando passado o id da plataforma, através de uma query, retorna uma lista da quantidade de filmes por gênero daquela plataforma.

`GET: /filmes/:filtro` - Filtro é um boolean, aonde caso seja **true** retorna todos os filmes assistidos e caso seja **false** retorna os filmes ainda não assistidos 

<br>

## Rotas das plataformas

`POST: /plataforma` - Insere uma nova plataforma, através do **body**:

```bash
{
    "nome": "star+"
}
```
`GET: /plataformas` - lista todas as plataformas cadastradas.

`DELETE: /plataforma/:id` - Delata uma plataforma através do seu id.