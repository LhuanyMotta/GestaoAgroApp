# GestaoAgroApp

GestaoAgroApp é uma aplicação móvel desenvolvida para auxiliar na gestão de atividades agropecuárias, permitindo o controle de animais, saúde, produção e geração de relatórios. A aplicação foi construída com React Native e utiliza Formik para validação de formulários, Yup para esquemas de validação e Context API para gerenciamento de estado.

## Funcionalidades

- **Cadastro de Animais**: Registro e gerenciamento de dados dos animais, incluindo nome, peso, raça, sexo e idade.
- **Controle de Saúde**: Acompanhamento de vacinas, tratamentos e verificações de saúde dos animais.
- **Gestão de Produção**: Monitoramento da produção de leite e ganho de peso dos animais.
- **Relatórios**: Geração de relatórios gráficos (barras e linhas) para análise de dados.
- **Filtros e Buscas**: Filtragem de animais, registros de saúde e produção por diferentes critérios.
- **Autenticação**: Tela de login e registro de usuários com validação de campos.

## Tecnologias Utilizadas

- **Frontend**: React Native
- **Navegação**: React Navigation
- **Validação de Formulários**: Formik e Yup
- **Gráficos**: React Native Chart Kit
- **Ícones**: React Native Vector Icons
- **Gerenciamento de Estado**: Context API
- **Animação**: React Native Animatable

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **/screens**: Contém as telas da aplicação, como Login, Cadastro de Animais, Controle de Saúde, etc.
- **/context**: Gerenciamento de estado global com Context API.
- **/utils**: Utilitários, como temas, estilos globais, botões e inputs.

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/LhuanyMotta/GestaoAgroApp.git
   cd GestaoAgroApp
   ```
2. **Instale as dependências:**
    ```bash
    npm install
    ```

3. **Execute o projeto:**

- **Para Android:**

    ```bash
    npx react-native run-android
    ```
- **Para iOS:**

    ```bash
    npx react-native run-ios
    ```

## Telas da Aplicação

### Login
- **Autenticação de usuários**: Validação de e-mail e senha.
- **Redirecionamento**: Tela de registro para novos usuários.

### Cadastro de Animais
- **Formulário de cadastro**: Inclusão de dados como nome, peso, raça, sexo e idade.
- **Filtragem**: Busca de animais por código do brinco, raça ou sexo.
- **Edição**: Atualização de dados dos animais cadastrados.

### Controle de Saúde
- **Registro de saúde**: Acompanhamento de vacinas, tratamentos e verificações de saúde.
- **Filtragem**: Busca de registros por veterinário, status ou data.

### Gestão de Produção
- **Registro de produção**: Monitoramento da produção de leite e ganho de peso.
- **Filtragem**: Busca de registros por tipo de animal ou data de produção.

### Relatórios
- **Gráficos**: Visualização de dados através de gráficos de barras e linhas.
- **Filtragem**: Geração de relatórios por tipo (animais, saúde, produção).

## Licença

Este projeto está licenciado sob a **MIT License**.