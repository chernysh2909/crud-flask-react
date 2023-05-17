# Flask + React

---

### init db

go to shell

`flask --app main shell`

`db.create_all()`

---

### run app
`python main.py`


export FLASK_APP="run:create_app('config.DevConfig')"

flask --app 'run:create_app("config.DevConfig")' shell

gunicorn run:app
