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





# Espresso-PID
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
A web-based PID controller primarily aimed for controlling espresso machines. In my case: the Gaggia Classic Pro

### Why 
The most popular entry-level espresso machines such as the Gaggia Classic Pro and the Rancilio Silvia don't come with a PID. Installing a PID is one of the best upgrades in order to pull consistant shots and avoid temp-surfing. 

## Built With
The front-end of the app is built on [Vue 3](https://vuejs.org/guide/introduction.html) with the [Quasar](https://quasar.dev/) framework. The back-end server for this app is built using [Python](https://www.python.org/) and [Flask](https://flask.palletsprojects.com/en/2.1.x/). The front-end and back-end communicate using [socketio](https://socket.io/)



## Requirements



| Component | Cost (AUD) | Notes |
| ------ | ------ | ------ |
| [MAX31855 Breakout Board](https://www.amazon.com.au/JulyCrab-Thermocouple-Temperature-Controller-Interface/dp/B09VPP79QQ/ref=sr_1_14?crid=2XNNMTMY603P1&keywords=max31855&qid=1651638270&refresh=1&sprefix=max3185%2Caps%2C257&sr=8-14) | $15 |
| [K-Type thermocouple probe](https://www.amazon.com.au/uxcell%C2%AE-Thermocouple-Temperature-Sensor-Printer/dp/B07MGJX5N5/ref=sr_1_6?crid=2RKLQZEV7ZHWZ&keywords=k-type+thermocouple+m4&qid=1651638706&sprefix=k-type+thermocouple+m%2Caps%2C263&sr=8-6) | $15 | The GCP uses an m4 thread screw so I got the same one in the link, you may need to get a different probe  depending on your machine |
| [Solid State Relay (SSR)](https://www.amazon.com.au/SSR-100DD-Module-Control-Voltage-Industrial/dp/B08F54DX5V/ref=sr_1_1_sspa?crid=1HSW8FYWP52UM&keywords=SSR&qid=1651638725&sprefix=ssr%2Caps%2C266&sr=8-1-spons&psc=1&smid=AILSKCC2Q2KS0&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzU09QWjJJVzNLWlBCJmVuY3J5cHRlZElkPUEwNDcyNDk3MzY1NE5HU1FPRTBaVyZlbmNyeXB0ZWRBZElkPUExVDhaV0FXTVpKREhRJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==) | $25 |
| High Temp rated wire | $10 | Silicone wire rated for ***high-temperature*** at 14 gauge or lower (I used 12 gauge) |
| [Single-Board Computer (Raspberry Pi)](https://core-electronics.com.au/raspberry-pi-3-model-b-plus.html) | $60 | I had a spare Raspberry Pi 3b+ so my total cost was much lower as this is the most expensive part of the build |
| Total | ~$120 | ~$60 if you already have a SBC


## Hardware Installation
![Wiring Diagram](https://github.com/tsemovic/Espresso-PID/blob/main/images/theme1.jpg?raw=true)



## Software Installation

Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:${package.json.version} .
```

This will create the dillinger image and pull in the necessary dependencies.
Be sure to swap out `${package.json.version}` with the actual
version of Dillinger.



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
