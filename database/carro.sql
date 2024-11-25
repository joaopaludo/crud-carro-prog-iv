create database carrocrudprogiv;

create table if not exists public.carro (
	id serial not null,
	marca varchar(30) not null,
	modelo varchar(30) not null,
	cor varchar(30) not null,
	ano numeric(4) not null,
	constraint carro_pk primary key (id)
);
