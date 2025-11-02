- Cuida Pet

Cuida Pet é um aplicativo desenvolvido para facilitar o controle de vacinação dos seus animais de estimação. Ele permite cadastrar informações detalhadas sobre cada pet, acompanhar o histórico de vacinas, receber alertas de doses próximas e visualizar, em um só lugar, as próximas vacinas de todos os pets do usuário.

1. Stacks

- React Native – Framework principal para desenvolvimento mobile.
- React Navigation – Gerenciamento de rotas e navegação entre telas.
- TypeScript – Tipagem estática e segurança ao código.
- Async Storage – Armazenamento local assíncrono para dados simples e persistência offline.
- OneSignal – Serviço de envio de notificações push.
- NPM – Gerenciador de pacotes para dependências do projeto.
- Jest – Framework de testes unitários para garantir a qualidade do código.
- Express.js – Framework backend em Node.js para criação da API do aplicativo.
- PostgreSQL – Banco de dados relacional utilizado para armazenamento das informações.

2. Estrutura do projeto

   - Styles

   Na pasta src/theme/ existem as definições de cores e fontes utilizadas no projeto.

   - Contextos

   O aplicativo conta com três contextos para gerenciamento de estados globais: AuthContext, PetContext e VaccineContext, localizados na pasta scr/contexts/. Nos contextos temos as regras de negócio da aplicação.

   - Hooks

   Os hooks estão na pasta src/hooks/, são eles: useAuth, usePet e useVaccine foram desenvolvidos para acessar as funções e estados globais dos seus respectivos contextos. O hook usePreviousRoute retorna o nome da tela anterior da rota.

   - Serviços

   Dentro da pasta scr/services/ estão localizadas as chamadas da api, separadas em pastas referentes ao tipo de serviço: auth, pets e vaccine.

   No arquivo api.ts estão as URLs da api, uma para produção e outra para a execução local para desenvolvimento.

   - Armazenamento local

   Na pasta /scr/storage/ possui o arquivo storageUser.ts que contém funções para armazenar e remover informações do usuário no armazenamento local do dispositivo, através do Async Storage.

   - Componentes

   Os componentes usados pelas telas da aplicação estão concentrados na pasta src/components/. Todos os componentes globais do aplicativo possuem o prefixo "CP" (Cuida Pet).

   - Telas

   Todas as telas estão na pasta src/screens/.

3. Testes unitários

   Foram desenvolvidos testes unitários de snapshot para todos os componentes da aplicação. Os testes ficam em um arquivo xxx.test.tsx nas pastas dos respectivos componentes. Foram desenvolvidos testes unitários para as funções dos arquivos age.ts e date.ts da pasta src/utils/.

   Para rodar todos os testes: 'npm run test'
   Para todar os testes de um arquivo específico: 'npm run test ${fileName}'

4. Instalação

   - git clone https://github.com/rodpaivac/cuida-pet-app.git
   - pull na branch 'main'
   - abrir o terminal na pasta cuida-pet-app
   - instalar dependências: 'npm install'
   - instalar pods, se necessário: 'cd ios && npx pod-install --repo-update'
   - limpar tudo no android, se necessário: 'cd android && ./gradlew clean'
   - rodar o app no android: 'npx expo run:android'
   - rodar o app no ios: 'npx expo run:ios'
