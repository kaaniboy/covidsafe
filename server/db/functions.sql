  create or replace function db_public.update_place_rating() returns trigger as $$
  declare
    _overall_rating float;
    _employee_masks_avg float;
    _customer_masks_avg float;
    _distancing_avg float;
    _dividers_avg float;
  begin
    select (sum(employee_masks)::float / count(employee_masks)) into _employee_masks_avg
      from db_public.review where place_id = NEW.place_id and employee_masks is not null;

    select (sum(customer_masks)::float / count(customer_masks)) into _customer_masks_avg
      from db_public.review where place_id = NEW.place_id and customer_masks is not null;

    select (sum(distancing)::float / count(distancing)) into _distancing_avg
      from db_public.review where place_id = NEW.place_id and distancing is not null;

    select (1 + 4 * sum(dividers)::float / count(dividers)) into _dividers_avg
      from db_public.review where place_id = NEW.place_id and dividers is not null;

    if coalesce(_employee_masks_avg, _customer_masks_avg, _distancing_avg, _dividers_avg) is null then
      select null into _overall_rating;
    else
      select (
          coalesce(_employee_masks_avg, 0)
          + coalesce(_customer_masks_avg, 0)
          + coalesce(_distancing_avg, 0)
          + coalesce(_dividers_avg, 0)
        )
        / (
          (case when _employee_masks_avg is null then 0 else 1 end)
          + (case when _customer_masks_avg is null then 0 else 1 end)
          + (case when _distancing_avg is null then 0 else 1 end)
          + (case when _dividers_avg is null then 0 else 1 end)
      ) into _overall_rating;
    end if;

    insert into db_public.place (id, overall_rating, employee_masks_avg, customer_masks_avg, distancing_avg, dividers_avg)
      values (NEW.place_id, _overall_rating, _employee_masks_avg, _customer_masks_avg, _distancing_avg, _dividers_avg)
      on conflict (id) do update set
        overall_rating = _overall_rating,
        employee_masks_avg = _employee_masks_avg,
        customer_masks_avg = _customer_masks_avg,
        distancing_avg = _distancing_avg,
        dividers_avg = _dividers_avg;

    return null;
  end;
  $$ language plpgsql strict security definer;