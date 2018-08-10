import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import { logout } from './actions/session_actions'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')
  const store = createStore();

  // TESTING START
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.logout = logout();
  // TESTING END

  ReactDOM.render(<Root store={store}/>, root);
});

const createStore = () => {
  let store;

  if (window.currentUser) {
    const currentUser = window.currentUser;
    const preloadedState = {
      session: { id: currentUser.id },
      entities: { users: { [currentUser.id]: currentUser }}
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  return store;
}
