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

- Note

  - Nice to [watch](https://www.youtube.com/watch?v=QXxy8Uv1LnQ&t=2538s) crash course for NextJS and Prisma.
  - Moved prisma folder to the root so we no need to run prisma with --schema option `npx prisma db push --schema src\prisma\schema.prisma`
    - Moving forward on this notes you can just omit the `--schema src\prisma\schema.prisma`
    - I am als updating the package.json build command.
      - This line, `"generate": "npx prisma generate --schema src/prisma/schema.prisma",`

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
      Note:
    - It much better to place the schema.prisma at the index folder, so we do not need to pass the directory every time.
    - Encountered an error while deploying at vercel "need to generate prisma", followed [this](https://stackoverflow.com/questions/67746885/prisma-client-did-not-initialize-yet-please-run-prisma-generate-and-try-to-i?rq=2). Fix created was in package.json file by adding Prisma generate on npm run build
    - Encountered error saying `pnpm` is no updated during. Fix was run pnpm install locally and pushed the `generated pnpm-lock.yaml`.
    - Encountered error when running `npm run dev` after a few days (2), need to run generate to fix it and importantly close an re-open vscode more on the error [here](https://github.com/prisma/studio/issues/370)

### Seeding

- Read [here](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding).
- Created ./prsima/seed.ts
- Added `"prisma": {
  "seed": "ts-node prisma/seed.ts"
},` to package.json
- We nee to install package ts-note `npm install -D ts-node @types/node`
- Finally run `npx prisma db seed`.
- Note: Seed will append to database not clear it.


### Zustand
https://www.reddit.com/r/reactjs/comments/15p6j4f/how_can_i_make_a_percomponent_zustand_store/?rdt=60011
https://github.com/pmndrs/zustand/blob/main/docs/guides/initialize-state-with-props.md



### Errors
- Error when using compound components and declaring "use client"
  - Read more [here](https://help.mantine.dev/q/server-components#error-compound-components-in-server-component) 