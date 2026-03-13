# MODIX POS

Monorepo for MODIX POS built with a microservices-oriented architecture.

## Structure

- `apps/`: backend apps and microservices
- `client/`: frontend clients
- `pkgs/`: shared packages
- `infra/`: local infrastructure and scripts
- `docs/`: architecture and domain documentation

## Main services

- `api-gateway`
- `auth-service`
- `business-service`
- `catalog-service`
- `sales-service`
- `payment-service`

## Main clients

- `pos-app`
- `admin-dashboard`

## Shared packages

- `@modix/pkgs/common`
- `@modix/pkgs/config`
- `@modix/pkgs/contracts`
- `@modix/pkgs/database`
- `@modix/pkgs/logger`
- `@modix/pkgs/messaging`
- `@modix/pkgs/testing`

## Setup

```bash
pnpm install
pnpm docker:dev
pnpm dev
```

