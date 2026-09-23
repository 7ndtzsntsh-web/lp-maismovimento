# Site do Studio +Movimento — regras para o Claude

Site vendido pela Vanguard Web Studio a um cliente real (estúdio de treino no João Paulo, Florianópolis).
No ar em https://studiomaismovimento.vercel.app (projeto Vercel `studiomaismovimento`, equipe `vanguard-web`;
push na `main` publica sozinho). Dado errado ou site quebrado expõe o dono na frente do cliente.

## Como trabalhar

- Autorizado a alterar e publicar sem pedir, **desde que**: revise e teste tudo antes; trabalhe em
  branch + Pull Request (o merge na `main` é a publicação); anote qual versão estava no ar antes;
  se algo quebrar, reverta na hora e conte com franqueza o que aconteceu.
- Consertar o que foi pedido. Conteúdo ou visual novo que ninguém pediu: sugerir primeiro.
- Nunca digitar senha, chave de API ou token. Quem põe é o dono.
- Responder em português do Brasil, simples e direto. O dono costuma ler pelo celular.

## Limite de publicações da Vercel (já travou este site)

- O plano gratuito aceita **100 publicações por dia para a equipe inteira** (todos os sites juntos).
  Cada commit enviado ao GitHub vira uma publicação (branch = prévia, `main` = produção).
- Em 22/09/2026 o site foi enviado **um arquivo por commit** (script do Antigravity): 77 publicações em
  1 hora, e a Vercel bloqueou tudo. **Sempre juntar as mudanças num commit só.** Nunca subir arquivo por
  arquivo pela API do GitHub.
- Se o check da Vercel no GitHub disser "Deployment rate limited", nada foi publicado: esperar liberar e
  publicar de novo (novo commit ou `vercel deploy --prod`).

## Comandos (obrigatório)

```bash
npm install     # uma vez
npm run build   # compila o CSS, põe código de versão no nome dos arquivos e roda as verificações
npm run dev     # servidor local (http://localhost:4321) com os mesmos cabeçalhos de segurança da Vercel
npm run security:scan   # Observatório da MDN contra o servidor local (com o dev rodando)
```

Não publicar se `npm run build` falhar.

## Regras do código

- Nunca editar `css/style.*.css` direto: mexer em `build/input.css` e rodar o build.
- Nunca `style="..."` nem `<script>` escrito dentro do HTML, e nunca CDN (nem Google Fonts). A segurança
  do site (CSP) bloqueia isso **em silêncio**: o visual quebra sem erro aparente.
- Se mudar o bloco `ld+json` do `index.html`, o hash dele na CSP do `vercel.json` muda junto
  (o `npm run build` avisa qual é).
- Imagens: WebP, com `width`/`height` e `draggable="false"`. O dono pediu que nenhuma imagem possa ser
  arrastada (CSS em `build/input.css` + `js/app.js`).
- Originais das imagens em `build/originais/` (não vão para o site, ver `.vercelignore`).
  A logo redonda (`img/logo-redondo*.webp`) é gerada da original com as bordas estendidas, porque
  o "+", o "O" e o @ encostam nas bordas e seriam cortados num recorte redondo simples.
- Estética: elemento novo copia as classes de um equivalente que já existe ("tem que manter sempre os padrões").
- Segurança: nota A+ 150/150 no MDN HTTP Observatory. Não pode cair.

## Dados conferidos (fonte e data)

- Endereço: Rodovia João Paulo, 1573 - João Paulo, Florianópolis - SC, **88030-415** (Google Maps; o CEP
  confere nos Correios: da 1501 ao fim é 88030-415. A Receita tem 88030-300, que está errado).
- Telefones: **(48) 99989-3373** e **(48) 98408-7800**, os dois com WhatsApp na fachada e no Instagram.
  O Instagram lista o 99989-3373 primeiro; o Google e a Receita têm o 98408-7800. O dono disse que o número
  do site estava errado (era só o 98408-7800), então o botão principal foi para o 99989-3373 e o rodapé
  mostra os dois. **Confirmar com o cliente qual é o principal.**
- Google: nota 4,7 com 6 avaliações (cinco de 5 estrelas e uma de 3), conferido em 22/09/2026. Link do lugar:
  https://www.google.com/maps?cid=16272621976483130819
- Depoimento no site: trecho curto de avaliação real (Marcel B.). Nunca inventar depoimento. Texto completo
  de avaliação só se o dono ou o cliente mandar.
- CNPJ 47.726.323/0001-20 ("Studio + Movimento"), aberto em 26/08/2022.
- Coordenadas: -27.5593378, -48.5164371.

## A confirmar com o cliente (não inventar)

- Duração do treino (o texto diz 50 a 60 min), regra de reposição de aula e estacionamento: vieram do rascunho
  inicial, sem fonte.
- Horários de funcionamento (o Google só mostra que abre às 07:00).
- A foto da fachada é uma captura do Google Street View (tem a marca "© 2026 Google"). Trocar por foto
  tirada pelo cliente quando ele mandar.
- Domínio próprio (maismovimentostudio.com.br não existe ainda). Se comprar, trocar canonical, og:url,
  sitemap, robots e security.txt.

## Armadilhas que já aconteceram (neste site ou no do Rafael Mansur, que tem a mesma base)

1. Script que sobe arquivo por arquivo: estourou o limite diário da Vercel e ainda criou arquivos com o
   caminho do Windows no nome (`C:/Users/...`), que impediam clonar o repositório no Windows.
2. `js/aos.js` e `css/aos.css` eram uma página de "Redirecting" baixada por engano: as animações nunca
   funcionaram e o console dava erro.
3. `loading="lazy"` dentro de um bloco `data-aos` nunca carrega (o bloco começa invisível). O mapa é
   carregado pelo `js/app.js`.
4. Arquivo com quebra de linha CRLF muda o selo de integridade (SRI): o navegador bloqueia o script e a
   página fica **em branco**. O `.gitattributes` força LF e o `npm run build` confere.
5. Com script `build` no `package.json`, a Vercel exige `"outputDirectory": "."` no `vercel.json`.
6. `curl` repetido no domínio dispara o anti-robô da Vercel (erro 403). Não é o site caindo.

## Sessão na nuvem (aberta pelo celular, com o PC do dono desligado)

- Dá para: editar, rodar `npm run build`, abrir o PR, esperar o check da Vercel no PR e mesclar.
  Se não conseguir mesclar, peça ao dono para tocar em "Merge" no PR (dá pelo app do GitHub).
- Se não der para conferir o site no ar, diga isso claramente em vez de supor que funcionou.
- O que não der para fazer ou conferir na nuvem: deixe anotado no GitHub (issue, ou PR em rascunho)
  com título começando por **"Fazer no PC:"**, para não se perder.
