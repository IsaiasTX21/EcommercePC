// Edite aqui textos e visual. Produtos, coleções, preços, estoque e imagens vêm do painel da Shopify.
export const site = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Minha Tech",

  // O número no ícone do carrinho conta "produtos" (itens diferentes) ou "unidades" (soma das quantidades)
  cartBadge: "produtos",

  // Menu: "Departamentos" usa o menu da Shopify com este handle (Loja virtual > Navegação).
  // Se o menu não existir, usa todas as coleções. Menus com sub-itens viram colunas.
  nav: {
    menuHandle: "departamentos",
    links: [
      { label: "Ofertas", href: "/ofertas" },
      { label: "Mais vendidos", href: "/loja?ordem=vendidos" },
      { label: "Lançamentos", href: "/loja?ordem=novos" },
    ],
    promo: { enabled: true, label: "Monte seu setup completo", href: "/loja" },
  },

  // Banners padrão. Para gerenciar pelo painel da Shopify, crie entradas do metaobjeto "banner" (veja o README).
  banners: {
    hero: [
      { title: "Monte seu setup", subtitle: "Componentes e periféricos para o seu PC", button: "Ver produtos", href: "/loja", background: "linear-gradient(120deg,#ff6a00,#c2410c)" },
      { title: "Ofertas da semana", subtitle: "Produtos selecionados com desconto", button: "Aproveitar", href: "/ofertas", background: "linear-gradient(120deg,#0a4fb4,#052a66)" },
      { title: "Lançamentos", subtitle: "As novidades que acabaram de chegar", button: "Conferir", href: "/loja?ordem=novos", background: "linear-gradient(120deg,#1f2937,#0f172a)" },
    ],
    strip: [
      { title: "Uma ferramenta completa para montar o seu setup", button: "Começar agora", href: "/loja", background: "linear-gradient(90deg,#0f172a,#1e293b)" },
    ],
  },

  // Fileiras de produtos da home. Cada uma usa uma coleção (handle) ou uma fonte automática:
  // source: "vendidos" | "novos" | "oferta" (oferta = produtos com "preço de comparação" maior que o preço)
  rails: [
    { title: "Novidades", source: "novos" },
    { title: "Mais vendidos", source: "vendidos" },
    { title: "Produtos em oferta", source: "oferta" },
    // Exemplo com coleção: { title: "Placas de vídeo", collection: "placas-de-video", fallback: "vendidos" },
  ],
  autoCategoryRails: 3, // cria uma fileira para cada uma das primeiras N coleções (0 desliga)

  sections: {
    circlesAria: "Categorias",
    tabsTitle: "Destaques",
    brandsTitle: "Marcas",
    relatedTitle: "Links relacionados",
  },

  // Exibição de preço. Ajuste conforme as condições reais da loja/gateway (0 oculta).
  pricing: {
    installments: 10, // "ou 10x de R$ ..." (parcelas máximas exibidas)
    minInstallment: 5, // valor mínimo da parcela
    pixDiscount: 0, // % de desconto exibido "no Pix" (só informativo; configure o desconto real na Shopify)
    lowStock: 20, // mostra "Restam N unid." até esse estoque (precisa SHOPIFY_READ_INVENTORY=true)
  },

  // Selos nos cartões de produto, controlados pelas TAGS do produto na Shopify (tom: orange | green | blue | dark)
  tagBadges: {
    "frete-gratis": { label: "Frete grátis", tone: "green" },
    "destaque": { label: "Destaque", tone: "orange" },
    "lancamento": { label: "Lançamento", tone: "blue" },
  },

  // Cartões de serviço no fim da home. Links para páginas/políticas só aparecem se existirem na Shopify.
  services: [
    { title: "Compra segura", text: "Pagamento processado no checkout da Shopify", href: "/politicas/privacy-policy" },
    { title: "Acompanhe seu pedido", text: "Veja o status e o rastreio na sua conta", href: "/conta" },
    { title: "Trocas e devoluções", text: "Consulte nossa política", href: "/politicas/refund-policy" },
    { title: "Fale conosco", text: "Tire suas dúvidas com a equipe", href: "/pagina/contato" },
  ],

  // Newsletter: informe o endereço de envio do seu provedor (Mailchimp, Klaviyo...). Vazio = seção oculta.
  newsletter: { action: "", nameField: "FNAME", emailField: "EMAIL" },

  // Contato (a Shopify não tem API de formulário de contato)
  contact: { email: "", whatsapp: "" }, // whatsapp só com números e DDI, ex.: "5521999999999"

  footer: {
    menuHandle: "footer",
    menuFallbackTitle: "Institucional",
    columns: [
      { title: "Ajuda", links: [
        { label: "Dúvidas gerais", page: "duvidas" },
        { label: "Entregas", page: "entregas" },
        { label: "Devoluções", page: "devolucoes" },
        { label: "Pagamentos", page: "pagamentos" },
        { label: "Fale conosco", page: "contato" },
      ] },
      { title: "Sobre", links: [{ label: "Quem somos", page: "sobre" }] },
    ],
    social: { instagram: "", facebook: "", youtube: "" },
  },

  // Especificações mostradas na página do produto (metacampos). Crie as definições em
  // Configurações > Dados personalizados > Produtos, com acesso à Storefront API ativado.
  // namespace padrão = "shopify" (metacampos de categoria). "Marca" vem do campo Fornecedor do produto.
  attributes: [
    { label: "Modelo", namespace: "custom", keys: ["modelo", "model"], headline: true },
    { label: "Garantia", namespace: "custom", keys: ["garantia", "warranty"] },
    { label: "Compatibilidade", namespace: "custom", keys: ["compatibilidade", "compatibility"] },
    { label: "Conexão", namespace: "custom", keys: ["conexao", "connection"] },
    { label: "Especificações técnicas", namespace: "custom", keys: ["especificacoes", "specs"], block: true },
  ],
};
