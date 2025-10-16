CREATE SCHEMA IF NOT EXISTS "zombicide";

CREATE TABLE zombicide.users (
	"id" SERIAL PRIMARY KEY,
	"uuid" VARCHAR(40) NOT NULL,
	"name" VARCHAR(80) NOT NULL,
	"email" VARCHAR NOT NULL,
	"password" VARCHAR NOT NULL,
	"registration_date" TIMESTAMP WITH TIME ZONE NOT NULL,
	"avatar" VARCHAR,
	"password_reset_token" VARCHAR,
	"password_reset_token_expiration" TIMESTAMP WITH TIME ZONE
);
