create schema db_public;

create table db_public.review(
  id serial primary key,
  place_id text not null,
  user_id text not null,
  content text,

  created_at timestamp not null default current_timestamp,
  updated_at timestamp
);

create table db_public.vote(
  id serial primary key,
  review_id integer references db_public.review(id)
    on delete cascade not null,
  type smallint not null,
  
  created_at timestamp not null default current_timestamp,
  updated_at timestamp
);