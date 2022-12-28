# bready-cat-ainft-server

bready-cat-ainft API server

## Required ENVs:

see `.env.example` file

## Currently Applied IAM SA Key:

-   `storage-access@bready-cat-dev.iam.gserviceaccount.com`

## Docker

### build

```
docker build -t bready-cat-trigger .
```

### run

you must define .env before execute this command.

```
docker run --env-file .env -p 3000:3000 bready-cat-trigger
```
