# REST Client 🌐

Welcome to our `REST Client` application! This lightweight alternative to Postman combines essential features in one app.
Supports authorization and authentication capabilities. Access to the tool is restricted to authorized users only.
The history section provides quick access to previously executed requests 🚀.
Full task description [rest client](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md)

## Features

Key pages in the application include:

- Login and Registration pages 👤
- Main page 🏠
- RESTful client 🖥️, which includes:
  - method selector
  - text input for the endpoint URL
  - request editor
  - headers editor
  - response section
  - generated code section
- Variables 🔎
- History 📋

The application is developed in teams of three 👩‍💻👩‍💻👨‍💻 [Maria Ilina](https://github.com/IlinJoy), [Anastasiia Nikonova](https://github.com/anastanei), [Yuri S.](https://github.com/Sepulator).

## Tech-stack

- ⚡ [Next.js](https://nextjs.org/): The React Framework for the Web.
- 💪 [Strongly typed](https://www.typescriptlang.org/): Uses TypeScript.
- 🔥 [HeroUI](https://www.heroui.com/): Beautiful, fast and modern React UI library.
- 🤖 [Valibot](https://valibot.dev/): The modular and type safe schema library.
- 🎊 [Tailwind](https://tailwindcss.com/): Rapidly build modern websites without ever leaving your HTML.
- ⌨️ [Testing framework](https://vitest.dev/): Vitest to test the code base. It's fast!
- 🛍️ [Supabase](https://supabase.com/): The Postgres development platform.
- 🐒 [React CodeMirror](https://uiwjs.github.io/react-codemirror/): CodeMirror component for React.
- 📝 [React Hook Form](https://react-hook-form.com/): Performant, flexible and extensible forms with easy-to-use validation.
- 🐻 [Zustand](https://zustand-demo.pmnd.rs/): small, fast, and scalable bearbones state management solution.

## Getting Started

### Steps

#### 0. Supabase Configuration

- Get `Project URL` and `API Key` from Supabase Dashboard -> Project Overview -> Project API.
- Rename `.env.example` to `.env` and copy `Project URL` with `API Key`.
- Turn off `Confirm email` in Supabase Dashboard -> Authentication -> Sign In / Providers.

```bash copy
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-legacy-api-key-here

```

#### 1. Clone [repository](https://github.com/Sepulator/rest-client-app)

```bash copy
  git clone https://github.com/Sepulator/rest-client-app.git
```

#### 2. Open project directory and install dependencies

```bash copy
  npm install
```

#### 3. Start the development server

```bash copy
  npm run dev
```

This command starts the dev server locally `http://localhost:3000/`.

### Available scripts

#### Build for production

```bash copy
  npm run build
```

---

#### Start Vite dev server in the current directory

```bash copy
  npm run dev
```

---

#### Run ESLint to fix errors

```bash copy
  npm run lint
```

---

#### Run unit test

```bash copy
  npm run test
```

---

#### Unit test coverage

```bash copy
  npm run test:coverage
```

---

#### Run code format with Prettier

```bash copy
  npm run format
```

---

#### Run husky to prepare git hooks

```bash copy
  npm run prepare
```

---
