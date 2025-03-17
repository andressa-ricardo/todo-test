# 📑 To-Do List

To-Do List para você organizar suas tarefas do dia a dia.

---

##  Funcionamento do Projeto

![Funcionamento do projeto](https://i.imgur.com/notvHtd.gif)

---

##  Tecnologias Utilizadas

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- Radix UI
- DnD Kit

---

##  Configuração do Projeto

###  Requisitos

1. **Node.js** versão 18 ou superior
2. **Supabase** (conta e projeto criados)

###  Configuração do Supabase

1. Crie um projeto no [Supabase](https://app.supabase.com/)
2. Vá para **Configurações > API** e copie os valores de:
   - `URL do Projeto`
   - `Chave Anônima`
3. No diretório do projeto, renomeie `.env.example` para `.env.local` e preencha com:

   ```ini
   NEXT_PUBLIC_SUPABASE_URL=SEU_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=SEU_SUPABASE_ANON_KEY
   ```

4. Instale as dependências do projeto:
   ```bash
   npm install
   ```

5. Inicie o servidor local:
   ```bash
   npm run dev
   ```
   O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Funcionalidades

-  Adicionar, editar e remover tarefas
-  Reordenar tarefas via **drag-and-drop**
-  Autenticação com Supabase 

---

## Autor

- **LinkedIn:** [Andressa Ricardo](https://www.linkedin.com/in/andressa-ricardo/)
- **GitHub:** [andressa-ricardo](https://github.com/andressa-ricardo)

