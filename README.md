<h1 align="center">
  <a href='#'><img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/palette/macchiato.png" width="600px"/></a>
  <br>
  <br>
  <div>
    <a href="https://github.com/marcelldac/contact-book-api-aula/issues">
      <img src="https://img.shields.io/github/issues/marcelldac/contact-book-api-aula?color=fab387&labelColor=303446&style=for-the-badge">
    </a>
    <a href="https://github.com/marcelldac/contact-book-api-aula/stargazers">
      <img src="https://img.shields.io/github/stars/marcelldac/contact-book-api-aula?color=ca9ee6&labelColor=303446&style=for-the-badge">
    </a>
    <a href="https://github.com/marcelldac/contact-book-api-aula">
      <img src="https://img.shields.io/github/repo-size/marcelldac/contact-book-api-aula?color=ea999c&labelColor=303446&style=for-the-badge">
    </a>
  </div>
</h1>

<div align='center'>

# 🤖 Crypto Guardian 🤖
  
</div>


Crypto Guardian validation API, employed in scenarios where users seek to ascertain the optimal timing for purchasing Ethereum cryptocurrency. Users input their desired minimum and maximum values, and the API verifies whether the provided value range is suitable for the purchase of the crypto or not.

## Crypto Guardian Documentation

#### Returns the bid value
```http
  GET /api/v1/transaction
```

| Return   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `bidValue` | `string` | The current purchase value of Ethereum in BRL. |

#### Validate a transaction

```http
  POST /api/v1/validate-transaction
```

| Param   | Type       | Description                                   |
| :---------- | :--------- | :------------------------------------------ |
| `rangeBidValue`      | `string` | **Mandatory**. The financial range offered by the company for the operation, for example: $10,000 to $15,000. |

## Author

- [@marcelldac](https://www.github.com/marcelldac)

