create or replace function db_public.update_place_rating() returns trigger as $$
  declare
    _overall_rating float;
    _employee_masks float;
    _customer_masks float;
    _distancing float;
    _dividers float;
    _dine_in integer;
    _pick_up integer;
    _drive_thru integer;
  begin
    select (sum(employee_masks)::float / count(employee_masks)) into _employee_masks
      from db_public.review where place_id = NEW.place_id and employee_masks is not null;

    select (sum(customer_masks)::float / count(customer_masks)) into _customer_masks
      from db_public.review where place_id = NEW.place_id and customer_masks is not null;

    select (sum(distancing)::float / count(distancing)) into _distancing
      from db_public.review where place_id = NEW.place_id and distancing is not null;

    select (1 + 4 * sum(dividers)::float / count(dividers)) into _dividers
      from db_public.review where place_id = NEW.place_id and dividers is not null;

    select count(1) into _dine_in from db_public.review
      where place_id = NEW.place_id and dining_type = 'dine_in';

    select count(1) into _pick_up from db_public.review
      where place_id = NEW.place_id and dining_type = 'pick_up';

    select count(1) into _drive_thru from db_public.review
      where place_id = NEW.place_id and dining_type = 'drive_thru';

    if coalesce(_employee_masks, _customer_masks, _distancing, _dividers) is null then
      select null into _overall_rating;
    else
      select (
          coalesce(_employee_masks, 0)
          + coalesce(_customer_masks, 0)
          + coalesce(_distancing, 0)
          + coalesce(_dividers, 0)
        )
        / (
          (case when _employee_masks is null then 0 else 1 end)
          + (case when _customer_masks is null then 0 else 1 end)
          + (case when _distancing is null then 0 else 1 end)
          + (case when _dividers is null then 0 else 1 end)
      ) into _overall_rating;
    end if;

    insert into db_public.place
      (
        id, overall_rating, employee_masks, customer_masks,
        distancing, dividers, dine_in, pick_up, drive_thru
      )
      values (
        NEW.place_id, _overall_rating, _employee_masks, _customer_masks,
        _distancing, _dividers, _dine_in, _pick_up, _drive_thru
      )
      on conflict (id) do update set
        overall_rating = _overall_rating,
        employee_masks = _employee_masks,
        customer_masks = _customer_masks,
        distancing = _distancing,
        dividers = _dividers,
        dine_in = _dine_in,
        pick_up = _pick_up,
        drive_thru = _drive_thru;

    return null;
  end;
  $$ language plpgsql strict security definer;

create or replace function db_public.batch_place_ratings(place_ids text[]) returns setof db_public.place as $$
  begin
    return query select * from db_public.place where id = any(place_ids);
  end;
  $$ language plpgsql stable strict security definer;