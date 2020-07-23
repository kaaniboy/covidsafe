create schema db_public;

create user covidsafe with encrypted password '---';
grant usage on schema db_public to covidsafe;
grant select, insert on table db_public.review to covidsafe;
grant usage, select on all sequences in schema db_public to covidsafe;

create table db_public.review(
  id serial primary key,
  place_id text not null,
  user_id text not null,

  content text,
  employee_masks smallint,
  customer_masks smallint,
  distancing smallint,
  dividers smallint,
  dining_type text,

  created_at timestamp not null default current_timestamp,
  updated_at timestamp
);

create trigger update_place_rating_trigger
    after insert on db_public.review for each row
    execute procedure db_public.update_place_rating();

create table db_public.place(
  id text primary key,
  overall_rating float,
  employee_masks_avg float,
  customer_masks_avg float,
  distancing_avg float,
  dividers_avg float
);

create table db_public.vote(
  id serial primary key,
  review_id integer references db_public.review(id)
    on delete cascade not null,
  type smallint not null,
  
  created_at timestamp not null default current_timestamp,
  updated_at timestamp
);