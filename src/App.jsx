import React, { useCallback, useEffect, useRef, useState } from 'react';

import qs from 'qs';

import algoliasearch from 'algoliasearch';
import { Autocomplete } from './components/Autocomplete';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import {
  connectSearchBox,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
} from 'react-instantsearch-dom';
import '@algolia/autocomplete-theme-classic/dist/theme.css';
import './app.css';

import logo from './assets/logo.svg';

const appId = 'FYVTGE51KQ';
const apiKey = 'ae86a1590b63da56d87c03d60257924e';
const searchClient = algoliasearch(appId, apiKey);

// This section here is basically creating url parameters based on the given
// actions. This is useful because it allows us 1 to see queries being done but also
// is very useful if we wanted to add insights in the future. Good for SEO as well.
function createURL(searchState) {
  return qs.stringify(searchState, { addQueryPrefix: true });
}

function searchStateToUrl({ location }, searchState) {
  if (Object.keys(searchState).length === 0) {
    return '';
  }

  return `${location.pathname}${createURL(searchState)}`;
}

function urlToSearchState({ search }) {
  return qs.parse(search.slice(1));
}

const VirtualSearchBox = connectSearchBox(() => null);

function App() {
  const [searchState, setSearchState] = useState(() =>
    urlToSearchState(window.location)
  );
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      window.history.pushState(
        searchState,
        null,
        searchStateToUrl({ location: window.location }, searchState)
      );
    }, 400);
  }, [searchState]);

  const onSubmit = useCallback(({ state }) => {
    setSearchState(searchState => ({
      ...searchState,
      query: state.query,
    }));
  }, []);
  const onReset = useCallback(() => {
    setSearchState(searchState => ({
      ...searchState,
      query: '',
    }));
  }, []);

  // I decided to use the querySuggestionsPlugin rather than searching the index manually
  // for its ease of use. I will say that it is slightly less customizable.
  const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'william_spencer_federated_search_query_suggestions',
  });

  return (
    //basically the creation of the search page. I kept it very simple for this assignment.
    //I kept the styling of the original SA assignment page
    <div className="app-container">
      <InstantSearch
        searchClient={searchClient}
        indexName="william_spencer_federated_search"
        searchState={searchState}
        onSearchStateChange={setSearchState}
        createURL={createURL}
      >
        <header className="header">
          <div className="header__container">
            <div className="header__logo-container">
              <img className="header__logo" src={logo} />
            </div>
            <VirtualSearchBox />
            <div className="header__searchbox-container">
              <Autocomplete
                openOnFocus={true}
                debug={true}
                plugins={[querySuggestionsPlugin]}
                initialState={{
                  query: searchState.query,
                }}
                onSubmit={onSubmit}
                onReset={onReset}
              />
            </div>
          </div>
        </header>
        <div className="results">
          <Hits hitComponent={Hit} />
        </div>

        <div className="pagination">
          <Pagination />
        </div>
      </InstantSearch>
    </div>
  );
}

function Hit(props) {
  return (
    <article>
      <div class="hit-image">
        <img src={props.hit.image} alt={props.hit.name} />
      </div>
      <h1>
        <Highlight hit={props.hit} attribute="name" />
      </h1>
      <p>
        <Highlight hit={props.hit} attribute="description" />
      </p>
      <div>
        By{' '}
        <strong>
          <Highlight hit={props.hit} attribute="brand" />
        </strong>{' '}
        {props.hit.hierarchicalCategories ? 'in' : ''}{' '}
        <strong>
          <Highlight hit={props.hit} attribute="hierarchicalCategories.lvl0" />
        </strong>
      </div>
    </article>
  );
}

export default App;
