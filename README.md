# ExPress

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-templating-B4CA65?logo=ejs&logoColor=black)](https://ejs.co/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Neon](https://img.shields.io/badge/Neon-hosted%20PostgreSQL-00E599?logo=postgresql&logoColor=111111)](https://neon.tech/)
[![Passport](https://img.shields.io/badge/Passport-authentication-34E27A?logo=passport&logoColor=111111)](https://www.passportjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-vanilla-F7DF1E?logo=javascript&logoColor=111111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-vanilla-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=111111)](https://render.com/)

ExPress is a server-rendered publishing platform for writing, editing, and sharing short-form posts. It is built with Express, EJS, PostgreSQL, and a handcrafted responsive frontend.

**Live demo:** [express-h37l.onrender.com](https://express-h37l.onrender.com)

## What it includes

- Account registration, login, logout, and protected post routes
- Full post CRUD with ownership checks
- Server-rendered EJS pages and reusable view partials
- Mobile-first responsive interface with light/dark themes
- Vanilla JavaScript for validation, character counts, menus, modals, and theme persistence
- PostgreSQL persistence through Neon
- Security and performance middleware with Helmet, compression, sessions, and response caching
- Custom 404 and 500 error pages

## Technology

| Area           | Tools                                     |
| -------------- | ----------------------------------------- |
| Runtime        | Node.js                                   |
| Server         | Express 5                                 |
| Views          | EJS                                       |
| Database       | PostgreSQL / Neon                         |
| Authentication | Passport Local, bcryptjs, express-session |
| Frontend       | Vanilla JavaScript and CSS                |
| Operations     | Helmet, compression, Morgan, Render       |

## Requirements

- Node.js 20.19 or newer
- A PostgreSQL database
- npm

## Run locally

```bash
git clone https://github.com/OzenFern/ExPress.git
cd ExPress
npm install
```

Create a `.env` file from `.env.example`:

```env
NODE_ENV=development
APP_PORT=3000
SESSION_SECRET=replace-with-a-long-random-secret
DB_CONNECTION_URL=postgresql://user:password@host/database?sslmode=require
```

Apply the database schema to your PostgreSQL database:

```bash
psql "$DB_CONNECTION_URL" -f sql/schema.sql
```

The optional seed file inserts example content. Run it only when the database is empty:

```bash
psql "$DB_CONNECTION_URL" -f sql/seed.sql
```

Start the application:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production-style local run:

```bash
npm start
```

## Deploy to Render with Neon

### 1. Create the Neon database

Create a Neon PostgreSQL project and copy its pooled connection string. The connection string should include `sslmode=require`.

Run `sql/schema.sql` against the Neon database. `sql/seed.sql` is optional.

### 2. Create the Render web service

Connect the GitHub repository to Render and create a Web Service with:

| Setting       | Value         |
| ------------- | ------------- |
| Build command | `npm install` |
| Start command | `npm start`   |
| Environment   | `Node`        |

Render supplies the `PORT` variable automatically. The application uses it in production and falls back to `APP_PORT` locally.

### 3. Add environment variables

Add these variables in the Render dashboard:

| Variable            | Value                                 |
| ------------------- | ------------------------------------- |
| `NODE_ENV`          | `production`                          |
| `SESSION_SECRET`    | A long, unique random secret          |
| `DB_CONNECTION_URL` | The Neon PostgreSQL connection string |

Never commit `.env` or database credentials. A production session store should be added before running multiple instances; the current session configuration uses Express's in-memory store and is intended for this single-service project.

## Project structure

```text
ExPress/
├── public/
│   ├── css/
│   │   ├── base/tokens.css
│   │   ├── components/motion.css
│   │   └── main.css
│   └── js/main.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── strategies/
│   ├── utils/
│   └── views/
├── sql/
│   ├── schema.sql
│   └── seed.sql
├── .env.example
├── package.json
└── README.md
```

## Available scripts

| Command                | Purpose                             |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start with Nodemon                  |
| `npm start`            | Start the production server         |
| `npm run lint`         | Run ESLint                          |
| `npm run lint:fix`     | Apply ESLint fixes                  |
| `npm run format`       | Format the repository with Prettier |
| `npm run format:check` | Check Prettier formatting           |

## Validation rules

| Field   | Rule                   |
| ------- | ---------------------- |
| Title   | 3-100 characters       |
| Blurb   | 10-180 characters      |
| Content | At least 30 characters |

Validation is enforced in the browser, with title and blurb length constraints also enforced by the database. Authorization is enforced server-side by scoping post queries to the authenticated user's `user_id`.

## Version history

- **v1.0.0** (`main`): Initial Express/EJS posting application with in-memory post data and Bootstrap UI.
- **v2.0.0** (`frontend`): PostgreSQL persistence, authentication, protected CRUD routes, production middleware, Render/Neon deployment support, and the redesigned vanilla CSS frontend.

See [CHANGELOG.md](CHANGELOG.md) for the detailed release history.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Author

**Ozen Fernandes**
