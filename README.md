
# Crypto Guardian API

Uma API destinada ao público financeiro que visa conectar e facilitar transações de criptomoedas junto a um website. 


## Documentação da API

#### Retorna o bid value
```http
  GET /api/v1/transaction
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `bidValue` | `string` | Valor de compra em atual do ethereum em BRL |

#### Retorna um item

```http
  POST /api/v1/transaction
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `rangeBidValue`      | `string` | **Obrigatório**. O range financeiro que a empresa disponibiliza para a operação Ex.: 10000-15000 |

## Autores

- [@marcelldac](https://www.github.com/marcelldac)

