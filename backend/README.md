# Backend part of the web project

## Install for developing

Install [poetry](https://python-poetry.org/docs/#installation)

Run from these commands from the backend directory:
```shell
poetry install
```

Switch to python venv by command:
```shell
poetry shell
```

install pre-commit-hook:
```shell
pre-commit install
```

## Install for production

install [docker](https://docs.docker.com/engine/install/)

install [docker-compose](https://docs.docker.com/compose/install/)

to set up all containers run command from root directory of the project:
```shell
docker-compose up -d build
```

to set down run command from this directory :
```shell
docker-compose down
```
