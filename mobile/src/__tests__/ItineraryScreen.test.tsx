import React from 'react';
import { render } from '@testing-library/react-native';
import { ItineraryScreen, formatFlightTimeWithZone } from '../screens/ItineraryScreen';

describe('ItineraryScreen Time-Zone Display', () => {
  it('formats flight time correctly with airport local time zone', () => {
    expect(formatFlightTimeWithZone('10:00', 'JFK')).toBe('10:00 (EDT)');
    expect(formatFlightTimeWithZone('14:30', 'LHR')).toBe('14:30 (GMT)');
    expect(formatFlightTimeWithZone('08:15', 'XYZ', 'PST')).toBe('08:15 (PST)');
  });

  it('renders itinerary screen with departure and arrival times with zones', () => {
    const { getByTestId } = render(
      <ItineraryScreen
        flightNumber="TQ100"
        departureTime="10:00"
        arrivalTime="20:00"
        departureAirport="JFK"
        arrivalAirport="LHR"
      />
    );

    expect(getByTestId('departure-time').props.children).toBe('10:00 (EDT)');
    expect(getByTestId('arrival-time').props.children).toBe('20:00 (GMT)');
  });
});
export {};
