# bready-cat-ainft-server

bready-cat-ainft API server

## Required ENVs:

see `.env.example` file

## Currently Applied IAM SA Key:

-   `storage-access@bready-cat-dev.iam.gserviceaccount.com`

## Docker

### build

```
docker build -t bready-cat-ainft-server .
```

### run

you must define .env before execute this command.

```
docker run --env-file .env -p 3000:3000 bready-cat-ainft-server
```


## notes

old repo? - https://github.com/ainize-team/bready-cat-trigger ? https://github.com/ainize-team/bready-cat-ainft-server