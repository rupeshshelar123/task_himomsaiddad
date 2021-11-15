import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// To mock location permission and coordinates
global.navigator.permissions = {
  query: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve({ state: 'granted' })),
};

global.navigator.geolocation = {
  getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 43.21,
          longitude: -87.654321,
        },
      })
    )
  ),
};


test('Contains Weather App as text', () => {
  const {getByText} = render(<App />);
  expect(getByText('Weather App')).toBeTruthy();
});

test('Contains Welcome text', () => {
  const {getByText} = render(<App />);
  expect(getByText('Welcome', { exact: false } )).toBeTruthy();
});

test('Displays Fetching coordinates after click on Get Weather button', () => {
  const {getByText} = render(<App />);
  fireEvent.click(screen.getByText('Get weather', { exact: false } ));
  expect(getByText('Fetching location coordinates')).toBeTruthy();
});
