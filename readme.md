## start

`docker-compose up --build -d`

`docker exec -it back-container bash `

`flask --app 'run:create_app("config.ProdConfig")' shell`

`db.create_all()`
