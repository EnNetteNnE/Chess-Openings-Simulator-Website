create table users(
	id serial primary key,
    login varchar(50),
    password varchar(50)
);

create table tokens(
	id serial primary key,
    token varchar(50),
    user_id integer REFERENCES users(id)
);


create table tree_moves(
	id serial primary key,
    user_id integer REFERENCES users(id),
    name varchar(50)
);

create table moves(
	id serial primary key,
	number integer,
    tree_id integer REFERENCES tree_moves(id),
	position_after varchar(100),
	name_move varchar(10),
    prevent_move integer REFERENCES moves(id),
    color boolean
);
