FROM python:3.10
WORKDIR /backend
COPY . /backend
EXPOSE 8000
RUN pip install -r requirements.txt
CMD ["gunicorn", "--bind", "0.0.0.0:8000","run:app"]