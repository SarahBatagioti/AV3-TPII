![Banner Atlantis](src/img/bannerAtlantis.png)

O Atlantis é um sistema de gestão para parques aquáticos, clubes e hotéis. Nesta versão, o projeto atende ao MVP solicitado na atividade com um CLI em TypeScript para de cadastro e gerenciamento de
hospedagens usando o padrão de projeto “Builder”.

## Requisitos para rodar

- Node.js: v24.13.1 (versão testada)
- npm: versão que acompanha o Node v24.13.1

## Como rodar o projeto

### 1) Clonar o repositório

```bash
git clone https://github.com/SarahBatagioti/AV3-TPII
```

### 2) Entrar na pasta do projeto

```bash
cd AV3-TPII
```

### 3) Instalar dependências do projeto

```bash
npm install
```

### 4) Compilar TypeScript para JavaScript

```bash
npm run build
```

Saída esperada:
- Os arquivos compilados serão gerados na pasta `js`.

### 5) Executar o projeto
```bash
npm start
```

### Status do CI

Este projeto possui CI com GitHub Actions em modo multi-OS. A cada push, o pipeline instala dependências, compila o TypeScript e executa o sistema em Linux, Windows e macOS. Com o badge em verde, fica visível que o projeto foi testado e passou nos 3 sistemas operacionais.

[![Multi-OS CI](https://github.com/SarahBatagioti/AV3-TPII/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/SarahBatagioti/AV3-TPII/actions/workflows/ci.yml?query=branch%3Amain)