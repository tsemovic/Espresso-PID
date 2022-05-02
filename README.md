Espresso-PID
--------------

for running the server
python run.py


for updating py requirements.txt
pipreqs . --force


for installing dependancies on requirements.txt
pip install -r requirements.txt


Docker
--------------

for login
docker login

for building
docker build -t espresso-pid .

for building on arm (pi)
docker buildx build --platform linux/arm/v7 -t espresso-pid .

for pushing
docker tag espresso-pid:latest tsemovic/espresso-pid:latest
docker push tsemovic/espresso-pid:latest
