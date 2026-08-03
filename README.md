<div align="center">

# chrysg.com

Personal Website and Blog of Chrys Gonsalves
</div>

This site is self-hosted behind [Cloudflare](https://www.cloudflare.com) and
built with [Next.js](https://nextjs.org). A Next.js API route handles contact
form submissions, Cloudflare Turnstile validates them, and SMTP delivers the
resulting email.

## Local development

Install the dependencies and create a local environment file:

```sh
cd lander
npm ci
cp .env.example .env.local
```

Fill in the values in `lander/.env.local`, then start Next.js:

```sh
npm run dev
```

Next.js loads `.env.local` automatically.

## Environment variables

### Build-time variable

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is compiled into the browser bundle by
`next build`.

By default, the Taskfile reads this value from the gitignored
`lander/.env.local` file and passes only this public value to Docker as a build
argument. The Turnstile secret and SMTP credentials are not included in the
image.

### Runtime variables

The server reads these values when the container is running:

| Variable           | Purpose                                             |
| ------------------ | --------------------------------------------------- |
| `TURNSTILE_SECRET` | Server-side Cloudflare Turnstile token verification |
| `MAIL_HOST`        | SMTP hostname                                       |
| `MAIL_USER`        | SMTP username                                       |
| `MAIL_PASS`        | SMTP password                                       |
| `MAIL_FROM`        | Permitted or verified sender address                |
| `MAIL_TO`          | Recipient for contact-form submissions              |

SMTP uses port 587 with STARTTLS. The port is currently fixed in the mail
adapter rather than configured through an environment variable.

## Build

Docker builds are managed from the repository root with
[Task](https://taskfile.dev/):

```sh
task build:docker-git
```

The build task:

1. Reads `NEXT_PUBLIC_TURNSTILE_SITE_KEY` from `lander/.env.local`.
2. Archives the committed `master` version of `lander` as a clean Docker build
   context.
3. Builds a `linux/amd64` image.
4. Tags it as both `chrysg.com/lander:master-<commit>` and
   `chrysg.com/lander:latest`.

Because the context comes from Git, uncommitted application or Dockerfile
changes are not included. Commit changes before building.

To build another Git ref or read the public key from a different local env
file:

```sh
task build:docker-git REF=my-branch PUBLIC_ENV_FILE=lander/.env.production
```

The selected env file must exist locally and contain a non-empty
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`.

## Production server configuration

The deployment expects this directory on the VPS:

```text
/home/ops/configs/chrysg.com/
├── compose.yaml
└── .env.server.production
```

`compose.yaml` references `.env.server.production` using a relative path, so
the runtime file must be beside it. Its contents should be:

```dotenv
TURNSTILE_SECRET=
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
MAIL_FROM=
MAIL_TO=
```

The production server does not need `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at
runtime: it is already embedded in the image during the local build. A server
`.env.production` file is not read by the current Compose configuration and
does not affect an already-built client bundle.

The Taskfile assumes the server's Compose file and runtime env file have
already been installed. `task deploy` does not synchronize either of them.

## Deploy

From the repository root, ensure the desired changes are committed and
run:

```sh
task deploy
```

This command builds the image, streams `chrysg.com/lander:latest` to the server
through `docker save | ssh ... docker load`, and force-recreates the Compose
stack so it uses the newly loaded image and runtime environment.

The individual deployment stages can also be run separately:

```sh
task deploy:sync-image
task deploy:reload-stack
```
