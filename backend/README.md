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

Create file mysql.env for storing data for mysql database container. It should be:
```shell
MYSQL_DATABASE=mysql_database
MYSQL_USER=mysql_user
MYSQL_PASSWORD=mysql_password
MYSQL_ROOT_PASSWORD=mysql_root_password
```

Create also spp.env for storing env variables for application.
```shell
DB_URI=mysql+mysqlconnector://mysql_user:mysql_password@host:port/mysql_database
```
