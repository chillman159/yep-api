CREATE DATABASE  chargeasy;
\c chargeasy

CREATE TABLE UserPro(
   user_id serial PRIMARY KEY,
   email VARCHAR (255) UNIQUE NOT NULL,
   firstname VARCHAR (255)  NOT NULL,
   lastname VARCHAR (255)  NOT NULL,
   birth_date DATE NOT NULL,
   statususer BOOLEAN NOT NULL,
   password VARCHAR(255) NOT NULL
);

CREATE TABLE  car (
   car_id serial PRIMARY KEY,
   user_id INT NOT NULL,
   image_car VARCHAR(255) NULL,
   car_type VARCHAR ( 255)  NOT NULL,
   plug_type VARCHAR ( 255 )  NOT NULL,
   car_width VARCHAR ( 255 )  NOT NULL,
   car_length VARCHAR (255) NOT NULL,
   battery_capacity VARCHAR(255) NOT NULL,
   CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES userpro(user_id)
);

create TABLE favoris(
id_favoris serial PRIMARY KEY,
user_id INT NOT NULL,
chp_id    integer NOT NULL,
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES userpro(user_id),
    CONSTRAINT fk_chp
      FOREIGN KEY(chp_id) 
	  REFERENCES chp(chp_id));

create TABLE historical(
historical_id serial PRIMARY KEY,
user_id INT NOT NULL,
chp_id    integer NOT NULL,
date TIMESTAMPTZ NOT NULL,
price VARCHAR(255) NOT NULL,
energy VARCHAR(255) NOT NULL,
CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES userpro(user_id),
    CONSTRAINT fk_chp
      FOREIGN KEY(chp_id) 
	  REFERENCES chp(chp_id));


CREATE TABLE chp (
    "chp_id" serial PRIMARY KEY,
    "chp_user_id" integer NOT NULL,
    "chp_address" character varying(255) NOT NULL,
    "chp_latitude" character varying(255) NOT NULL,
    "chp_longitude" character varying(255) NOT NULL,
    "chp_status" character varying(255) NOT NULL,
    "chp_chargelevel" character varying(255) NOT NULL,
    "chp_parkinglength" character varying(255) NOT NULL,
    "chp_parkingheight" character varying(255) NOT NULL,
    "chp_parkingtype" character varying(255) NOT NULL,
    "chp_difficultyofaccess" character varying(255) NOT NULL,
    "chp_description" character varying(255) NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY(chp_user_id) 
	  REFERENCES userpro(user_id)
) WITH (oids = false);

create table reservation
(
    rsv_id     serial,
    rsv_start_at date    not null,
    rsv_ends_at  date    not null,
    chp_id       integer,x
    car_id       INT,
    status       rsv_status not null,
    PRIMARY KEY(rsv_id),
    CONSTRAINT fk_car
      FOREIGN KEY(car_id) 
	  REFERENCES car(car_id),
     CONSTRAINT fk_chp
      FOREIGN KEY(chp_id) 
	  REFERENCES chp(chp_id)    
);


