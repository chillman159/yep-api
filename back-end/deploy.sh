#!/bin/bash

#Donne le nom de l'image
name=yep

#Build l'image docker
docker build -t $name .

#Lance le docker-compose
docker-compose up -d