# Loja de eletrônicos: Next.js + Shopify (headless)

Layout inspirado em grandes e-commerces de informática (cabeçalho azul com busca, departamentos, carrosséis de produtos).
Produtos, coleções, preços, estoque, imagens e pedidos ficam **no painel da Shopify**. O site lê tudo pela Storefront API
e envia ao checkout da Shopify. Carrinho, variantes, login do cliente e pedidos funcionam como no projeto de roupas.

## Rodar
```bash
cp .env.example .env.local   # domínio, token da Storefront, Client ID (login)
npm install
npm run dev                  # http://localhost:3000   |   diagnóstico: /debug (só em desenvolvimento)
```
Token: app **Headless** → storefront → token público da Storefront API. Escopos: produtos/coleções, carrinho/checkout,
**conteúdo** (páginas, menus, políticas) e **metaobjetos** (banners). Publique produtos e coleções no canal Headless.

## O que você controla pelo painel da Shopify
| Parte do site | Onde editar na Shopify |
|---|---|
| Produtos, preço, estoque, fotos, variantes | Produtos |
| **Categorias** (menu, círculos, caixas da home, filtro) | **Coleções** (título = nome da categoria; imagem da coleção aparece nos círculos) |
| **Marcas** (seção Marcas e página `/marcas/X`) | Campo **Fornecedor** do produto |
| **Ofertas** (`/ofertas`, selo "-X%", preço riscado) | Preencha **Preço de comparação** (maior que o preço) |
| **Selos** nos cartões | **Tags** do produto: `frete-gratis`, `destaque`, `lancamento` (edite em `site.config.js > tagBadges`) |
| **Departamentos** (menu grande) | Loja virtual → Navegação → crie o menu **departamentos** (itens com sub-itens viram colunas). Sem ele, usa as coleções |
| **Fileiras da home** | `site.config.js > rails` (por coleção ou "novos", "vendidos", "oferta"). Veja `autoCategoryRails` |
| **Banners** do topo e faixa | Metaobjeto **banner** (abaixo). Sem ele, usa os banners padrão do `site.config.js` |
| Filtros (marca, specs, faixa de preço) | App **Search & Discovery** → Filtros |
| Especificações do produto | Metacampos `custom.*` (abaixo) |
| Páginas, políticas, rodapé | Loja virtual → Páginas; Configurações → Políticas; menu `footer` |

### Banners pelo painel (metaobjeto)
1. Configurações → Dados personalizados → **Metaobjetos** → Adicionar definição com o tipo/handle **`banner`**.
2. Campos (chave exata): `title`, `subtitle`, `button` (texto), `link` (URL), `image` (arquivo de imagem),
   `placement` (texto: `hero` ou `strip`), `background` (cor ou gradiente CSS, opcional), `color` (cor do texto, opcional).
3. Ative o acesso à **Storefront API** da definição e crie as entradas em Conteúdo → Metaobjetos.
4. Links `/collections/x`, `/products/x`, `/pages/x` são convertidos para as rotas do site.

### Especificações técnicas (metacampos)
Crie em Configurações → Dados personalizados → Produtos (acesso à Storefront API ativado), com namespace `custom` e chaves:
`modelo`, `garantia`, `compatibilidade`, `conexao` (texto) e `especificacoes` (texto longo, vira seção própria).
Para outros, edite `site.config.js > attributes`. "Marca" e "Tipo" saem do Fornecedor e do Tipo de produto.

### Parcelas, Pix e estoque
`site.config.js > pricing` controla "ou 10x de ...", "No Pix R$ ..." e "Restam N unid.". São apenas **informativos**:
ajuste às condições reais da loja (0 oculta). Para "Restam N unid." defina `SHOPIFY_READ_INVENTORY=true` e marque o escopo de estoque no Headless.

## Login do cliente (Customer Account API)
Igual ao projeto anterior: Headless → Customer Account API → Client ID em `SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID`;
callback `https://SEU-DOMINIO/api/auth/callback`, origem `SEU-DOMINIO` e logout `https://SEU-DOMINIO` (a Shopify exige HTTPS
e domínio público; teste pela Vercel). `SITE_URL=https://SEU-DOMINIO` na Vercel, vazio no `.env` local.

## Não incluído
Avaliações/estrelas, favoritos, cálculo de frete por CEP, cupom no carrinho e envio de formulário de contato
(a Shopify não tem API de contato). Newsletter só aparece se você informar `newsletter.action` (Mailchimp/Klaviyo).

## Segurança
Nunca coloque o Client Secret (`shpss_...`) no código. O `.env` e a pasta `certificates` já estão no `.gitignore`.
