# UFABC Não Foge à Luta! ✳

Site responsivo da chapa para o DCE da UFABC. Desenvolvido com HTML, CSS e JavaScript, usando as **artes originais do ZIP fornecido**. Pode ser publicado de graça no **GitHub Pages**.

## O que está pronto

- Página inicial com a identidade visual original da chapa, adaptada para vermelho e verde suaves, mantendo a arte completa do cartaz.
- **Quem somos**, três frentes da chapa, **53 propostas**, agrupadas em **12 eixos**, pesquisa, filtro e leitura expansível.
- Propostas favoritas salvas apenas no navegador do visitante (não são votos nem contagem pública).
- Botões de WhatsApp (link configurável), compartilhar/copiar endereço, animações suaves e visual responsivo para celular.
- **Painel administrativo escondido/discreto** para cadastrar, editar e excluir propostas, com possibilidade de salvar rascunhos.
- **Autenticação segura via Supabase Auth + regras Row Level Security (RLS)**. GitHub Pages sozinho não consegue armazenar propostas compartilhadas ou proteger um login de administração.

## 1. Publicar no GitHub Pages

1. Crie um repositório público no GitHub (por exemplo, `ufabc-nao-foge-a-luta`).
2. Envie **o conteúdo desta pasta**, sem criar uma pasta interna extra. `index.html` deve estar na raiz do repositório.
3. Em `Settings` → `Pages` → `Build and deployment`, escolha `Deploy from a branch`.
4. Selecione a branch `main`, pasta `/ (root)` e clique em **Save**.
5. Após a publicação, o endereço será semelhante a `https://SEU-USUARIO.github.io/ufabc-nao-foge-a-luta/`.

O site já funciona publicamente como **demonstração** sem banco. As propostas deste modo ficam em **`propostas.js`**, mas só se tornam gerenciáveis online após os passos seguintes.

## 2. Ativar o login e o banco de propostas

1. Crie uma conta e um novo projeto em **https://supabase.com/**.
2. Entre no projeto → **SQL Editor** → **New query**.
3. Cole o conteúdo completo do arquivo [`schema.sql`](schema.sql) e clique em **Run**. Isso cria tabelas, regras de segurança e as 53 propostas desta edição.
4. No painel Supabase, vá a **Project Settings → API** (ou seção de chaves de API). Copie:
   - **Project URL** (parece `https://seu-projeto.supabase.co`)
   - **anon / publishable key** (chave pública; pode começar com `sb_publishable_` ou `eyJ...`)
5. No começo do arquivo [`app.js`](app.js), substitua:

   ```js
   const SUPABASE_URL = 'https://SEU-PROJETO.supabase.co';
   const SUPABASE_ANON_KEY = 'SUA_CHAVE_PUBLICA';
   ```

6. **Não coloque a senha ou a chave `service_role`/`secret` no site.** Só a chave pública é apropriada para o navegador.
7. No Supabase, abra **Authentication → Users → Add user** e crie seu usuário administrador com e-mail e uma senha forte. Confirme o e-mail se necessário.
8. Volte a **SQL Editor** e execute (substitua pelo e-mail da conta criada):

   ```sql
   insert into public.site_admins (user_id)
   select id from auth.users
   where lower(email) = lower('SEU_EMAIL@EXEMPLO.COM')
   on conflict (user_id) do nothing;
   ```

9. Publique/atualize os arquivos no GitHub. Abra o site, role até o rodapé, clique no símbolo discreto **✳** à direita e entre com a conta criada.

**Atalho adicional:** `Ctrl + Alt + P` (ou `⌘ + Alt + P` em alguns sistemas) abre a área administrativa.

### Segurança do painel

O ícone discreto **não** é a proteção do painel: a autenticação do Supabase valida a conta e as regras **RLS** impedem que visitantes comuns modifiquem propostas mesmo acessando a API diretamente. Apenas usuários listados em `site_admins` podem inserir, editar ou excluir. O repositório público inclui a configuração de acesso, não a senha.

**Importante:** em Supabase → Authentication → Providers, evite permitir cadastros abertos se não forem necessários. Isso não substitui o cadastro de administradores, que é separado.

## 3. Cadastrar uma proposta

- Entre no painel no rodapé do site.
- Preencha **título**, **eixo** e **descrição**.
- Marque **Publicar no site** ou desmarque para deixar como **Rascunho**.
- Clique em **Salvar proposta**.
- Na lista de propostas, use **Editar** ou **Excluir**.

Uma proposta publicada aparece no site para todos os visitantes; um rascunho só aparece no painel e nas consultas autorizadas do administrador.

## 4. Personalizar

- Nome, textos e seções: `index.html`.
- Cores, fontes, animações e responsividade: `styles.css` (`:root` contém a paleta).
- Propostas exibidas **sem banco configurado**: arquivo `propostas.js`, na lista `window.PROPOSTAS_INICIAIS`.
- Propostas reais após configurar Supabase: gerencie somente pelo painel. `schema.sql` já traz textos iniciais, que devem ser revisados pela chapa.
- Artes originais compactadas: pasta `assets/`. Os arquivos `.webp` foram convertidos diretamente das artes fornecidas.

**Recomendação:** antes de divulgar, revise e aprove coletivamente todos os textos apresentados como propostas e substitua eventuais exemplos pelo programa oficial da chapa. Nenhum e-mail, Instagram ou WhatsApp foi inventado.

## 5. Testar no computador

Abra o projeto no VS Code e execute com Live Server, ou no terminal:

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`. Sem Supabase configurado, o site mostra exemplos de propostas, porém não permite entrar no painel nem salvar alterações para todos os visitantes.

## Arquivos

```text
index.html    Página principal
styles.css    Visual, responsividade e animações
app.js        Filtros, favoritos, interações e painel Supabase
schema.sql    Estrutura do banco, políticas de acesso e propostas iniciais
assets/       Identidade visual fornecida
README.md     Instruções de instalação e edição
```

---

**Feito para a chapa UFABC Não Foge à Luta! — por permanência, formação e moradia.**

## 6. Onde mudar o link do WhatsApp

Abra `app.js`, no começo do arquivo, e substitua:

```js
const WHATSAPP_URL = 'https://chat.whatsapp.com/SEU_CODIGO';
```

Você também pode usar `https://wa.me/5511999999999`. O link vale automaticamente
para **Vem com a gente** no menu e os botões **Venha fazer parte** do site.
Enquanto estiver vazio, os botões exibem um aviso e não apontam para um número inventado.

## 7. Onde editar as propostas e os eixos

- **Sem Supabase (site demonstrativo):** abra `propostas.js` e edite `window.PROPOSTAS_INICIAIS` (título, `category` e descrição); os eixos estão em `window.EIXOS_PROPOSTAS`.
- **Com Supabase:** entre no painel e use o formulário para adicionar, editar e publicar; o banco tem prioridade sobre os dados de demonstração.
- **Se já tinha configurado o Supabase com a versão anterior:** execute o `schema.sql` desta versão no SQL Editor novamente. Ele atualiza os eixos e importa as novas propostas sem duplicar títulos idênticos.

## 8. Onde mudar o layout e as imagens

- `index.html`: textos, ordem das seções e os botões.
- `styles.css`: procure `/* === VERSÃO 2:` no final; ali estão os ajustes de cores, cartaz inteiro, cartões, filtros e celular.
- `assets/cartaz.webp`: é a arte grande da capa, exibida inteira com `object-fit:contain`.
- `assets/adesivos.webp`: arte da faixa visual do meio da página.
- Mobile: ajustes em `@media(max-width:800px)` e `@media(max-width:560px)`.

**Dica:** veja primeiro em um navegador no celular e depois suba os arquivos alterados ao repositório.

> Os textos de propostas foram resumidos e organizados a partir do material enviado pela chapa.
> Confiram se a redação final está aprovada antes de divulgar publicamente.
