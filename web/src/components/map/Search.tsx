import React, { useState } from 'react';
import { AsyncTypeahead, TypeaheadMenu } from 'react-bootstrap-typeahead';
import { Spinner, Button } from 'react-bootstrap';
import LocationService, { CityLocation } from '../../services/LocationService';
import 'react-bootstrap-typeahead/css/Typeahead.css';

type Props = {
  isLoading: boolean,
  onEnter: (search: string) => void,
  onCitySelected: (city: CityLocation) => void
}

export default function Search({ isLoading, onEnter, onCitySelected }: Props) {
  const [locations, setLocations] = useState<CityLocation[]>([]);
  const [ref, setRef] = useState<any>(null);

  const retrieveLocations = async (query: string) => {
    try {
      const locations = await LocationService.retrieveLocations(query);
      setLocations(locations);
    } catch (error) {
      console.log(error);
      setLocations([]);
    }
  };

  const getLabelKey = (option: CityLocation) => {
    return `Go to ${option.city}, ${option.state_name}`
  };

  return (
    <div className='search'>
      <AsyncTypeahead
        id='search'
        placeholder='Search businesses or a city...'
        options={locations}
        labelKey={getLabelKey}
        isLoading={false}
        ref={ref => setRef(ref)}
        renderMenu={(options, menuProps) => {
          return options.length ?
            <TypeaheadMenu
              {...menuProps}
              options={options}
              labelKey={getLabelKey}
            />
            : null;
        }}
        onSearch={retrieveLocations}
        onChange={(cities: CityLocation[]) => {
          if (cities.length) {
            onCitySelected(cities[0]);
            ref.clear();
          }
        }}
        onKeyDown={(event: any) => {
          if (event.key === 'Enter') {
            onEnter(ref.state.text);
          }
        }}
      />

      {isLoading &&
        <Spinner
          className='loading'
          animation='grow'
          variant='primary'
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      {!isLoading &&
        <Button
          className='show-nearby'
          size='sm'
          onClick={() => onEnter(ref.state.text)}
        >
          Show nearby
        </Button>
      }
    </div>
  );
}