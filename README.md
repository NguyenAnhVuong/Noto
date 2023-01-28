<br />
<div align="center">
  <a href="https://noto-nine.vercel.app/folders">
    <img src="./frontend/public/noto_logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Noto</h3>

  <p align="center">
    Write something down you want to remember
    <br />
    <a href="https://noto-nine.vercel.app/folders">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#deploy-with">Deploy With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

- Noto is a website that helps you capture and prioritize ideas, projects and to-do lists.

### Built With

- [![Typescript][typescript]][typescript-url]
- [![Next][next.js]][next-url]
- [![TailwindCSS][tailwindcss]][tailwindcss-url]
- [![Antdesign][antdesign]][antdesign-url]
- [![Nest][nestjs]][nest-url]
- [![Prisma][prisma]][prisma-url]
- [![PostgreSQL][postgresql]][postgresql-url]
- [![GraphQL][graphql]][graphql-url]
- [![Firebase][firebase]][firebase-url]

### Deploy With

- [![Vercel][vercel]][vercel-url]
- [![Render][render]][render-url]

<!-- GETTING STARTED -->

## Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/NguyenAnhVuong/Noto
   ```
2. Install NPM packages
   ```sh
   cd backend
   npm i
   cd ..
   cd frontend
   npm i
   ```
3. Enter your Environment variables

- Create .env.local in frontend and set environment variables

  ```sh
  NEXT_PUBLIC_API_URL=
  NEXT_PUBLIC_API_KEY=
  NEXT_PUBLIC_AUTH_DOMAIN=
  NEXT_PUBLIC_PROJECT_ID=
  NEXT_PUBLIC_STORAGE_BUCKET=
  NEXT_PUBLIC_MESSAGING_SENDER_ID=
  NEXT_PULIC_APP_ID=
  ```

- Create .env in backend and set environment variables

  ```sh
  DATABASE_URL=
  PORT=
  FIREBASE=
  ```

4. Migration

   ```sh
   cd backend
   npx prisma migrate
   ```

5. Start

- Start backend:

  ```sh
  cd backend
  npm run start
  ```

- Start frontend:

  ```sh
  cd frontend
  npm run dev
  ```

<!-- USAGE EXAMPLES -->

## Contact

Nguyễn Anh Vương - [Facebook](https://www.facebook.com/vuong2k1)

Email: navuong2001@gmail.com

Github: [https://github.com/NguyenAnhVuong](https://github.com/NguyenAnhVuong)

<!-- MARKDOWN LINKS & IMAGES -->

[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[nestjs]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[nest-url]: https://nestjs.com/
[postgresql]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org/
[graphql]: https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white
[graphql-url]: https://graphql.org/
[firebase]: https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase
[firebase-url]: https://firebase.google.com/
[vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[vercel-url]: https://vercel.com/
[render]: https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white
[render-url]: https://render.com/
[prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwindcss]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwindcss-url]: https://tailwindcss.com/
[antdesign]: https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white
[antdesign-url]: https://ant.design/
