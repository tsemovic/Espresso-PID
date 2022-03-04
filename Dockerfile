FROM python:3.8-slim-buster
WORKDIR /ESPRESSO-PID/server
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
EXPOSE 5000
CMD [ "python", "app.py"]