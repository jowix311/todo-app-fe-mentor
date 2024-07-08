# README

- This will contain the process, researches and learnings from creating this exercise.

## Project Setup

- Using Prettier and its default settings to auto format code.
- Using two spaces as indention.
- Using Tailwind prettier extension to auto format classes. Link [here](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier).
  - Install extension on VS code.
- React Hook Form
- ShadCN
- Zod
- Using `pnpm` instead of `npm` (pnpm approach was on official NextJS tutorial)
- Postgres and Prisma guide
  - Installed PrismVS code extension

## NextJS Installation

- Follow this guide [here](https://nextjs.org/docs/getting-started/installation).
  - To create project on current folder just input `./` as the project name on the prompt.

## NextJS - Postgres - Prisma Guide

- Follow guide [here](https://vercel.com/guides/nextjs-prisma-postgres).
  - Skipped to Step 2 and run command `npm i -g vercel@latest`
    - Connected database to project in vercel on website
    - Ran command `vercel env pull .env` and there was an error prompting to run `vercel link` (yes to all prompts).
    - Re ran command `vercel env pull .env`
  - Step 3
    - Ran command `npm install prisma --save-dev`
    - Followed the additional steps (creating schema/seeder)
      - Created my own simple Model afterwards, ran `npx prisma db push --schema src\prisma\schema.prisma` passed --schema option since we did not place our file in the root
      - After creation success ran `npx prisma studio  --schema src\prisma\schema.prisma` (again we passed the --schema)
  - Step 4
    - Ran command `npm install @prisma/client`
      - If there are updates to the schema or new data run command `npx prisma generate --schema src\prisma\schema.prisma` and re run `npm run dev`
    - Followed command creating single Prisma Client connection
    - Created lib
  - Step 5
   - Did not follow, just customized code to show on the index page
