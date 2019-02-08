# cf-cadastro
Cadastro de usuários


# Scripts

create table users (
email varchar(30) PRIMARY KEY,
name varchar(30),
registered DATE
)


SELECT * FROM "public"."users"

INSERT INTO "public"."users" VALUES ('email@ovly.com.br', 'Fábio Pagoti', NOW())

DELETE FROM "public"."users"