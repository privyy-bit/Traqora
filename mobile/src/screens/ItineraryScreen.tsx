import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FlightItineraryProps {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTimeZone?: string;
  arrivalTimeZone?: string;
}

export const formatFlightTimeWithZone = (
  timeStr: string,
  airportCode: string,
  explicitZone?: string
): string => {
  const zone = explicitZone || (airportCode === 'JFK' ? 'EDT' : airportCode === 'LHR' ? 'GMT' : airportCode === 'LOS' ? 'WAT' : 'UTC');
  return `${timeStr} (${zone})`;
};

export const ItineraryScreen: React.FC<FlightItineraryProps> = ({
  flightNumber,
  departureTime,
  arrivalTime,
  departureAirport,
  arrivalAirport,
  departureTimeZone,
  arrivalTimeZone,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Itinerary: {flightNumber}</Text>
      <View style={styles.legContainer}>
        <Text style={styles.label}>Departure:</Text>
        <Text testID="departure-time">
          {formatFlightTimeWithZone(departureTime, departureAirport, departureTimeZone)}
        </Text>
      </View>
      <View style={styles.legContainer}>
        <Text style={styles.label}>Arrival:</Text>
        <Text testID="arrival-time">
          {formatFlightTimeWithZone(arrivalTime, arrivalAirport, arrivalTimeZone)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  legContainer: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
  },
});
