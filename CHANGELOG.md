# Changelog

All notable changes between the `main` v1 baseline and the `frontend` v2 release are documented here.

## [2.0.0] - 2026-09-05

### Added

- PostgreSQL persistence with schema and seed scripts.
- Neon-compatible database configuration.
- User registration, login, logout, session handling, and Passport Local authentication.
- Authenticated post ownership checks for listing, reading, editing, and deleting posts.
- Repository, service, controller, route, and middleware layers for the database-backed application.
- Helmet security headers, compression, Morgan request logging, response caching, and uncached authenticated pages.
- Render deployment support through the platform-provided `PORT` variable.
- Responsive vanilla CSS frontend with organized design tokens and motion styles.
- Light/dark theme persistence, mobile navigation, client-side form validation, character counters, dismissible messages, and custom delete modals.
- Custom 404 and 500 error pages.

### Changed

- Replaced the Bootstrap UI with a mobile-first editorial design.
- Replaced the monolithic `public/index.js` and `public/styles.css` entrypoints with organized `public/js/main.js` and `public/css/main.css` entrypoints.
- Reorganized the views into authentication, page, post, error, and reusable partial templates.
- Updated session cookies for production safety with HTTP-only, SameSite, and environment-aware secure settings.
- Updated documentation and deployment instructions for Render and Neon.

### Fixed

- Corrected the authentication middleware so protected routes continue through `next()`.
- Fixed user ID serialization and Passport's asynchronous user lookup.
- Fixed registration password hashing and email field handling.
- Fixed post inserts to use the `user_id` database column.
- Fixed post update placeholders and restricted dynamic updates to approved post fields.
- Fixed edit and delete controllers to pass request data and authenticated ownership IDs.
- Fixed delete routing to use POST instead of a GET mutation.
- Fixed PostgreSQL post ID references in views.
- Fixed flash success messages so they render after redirects.
- Fixed error handling to detect `res.headersSent` and propagate unexpected async failures.

## [1.0.0] - Initial release

### Added

- Express and EJS server-rendered posting application.
- In-memory post CRUD flow.
- Bootstrap-based responsive pages.
- Create, edit, delete confirmation, and custom error views.
- Client-side form validation and character counters.
- Initial project documentation and screenshots.

[2.0.0]: https://github.com/OzenFern/ExPress/tree/frontend
[1.0.0]: https://github.com/OzenFern/ExPress/tree/main
