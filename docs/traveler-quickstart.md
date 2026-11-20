# Traqora V1 Traveler Quickstart Guide

Welcome to Traqora! This guide covers everything you need to start searching, booking, and managing decentralized flight bookings on the Stellar network.

## 1. Account & Wallet Setup

Traqora operates on the Stellar network using Soroban smart contracts. To interact with the platform, you will need a supported Stellar-compatible Web3 wallet (such as Freighter or Albedo).

- **Create or Import Wallet**: Set up your Stellar wallet and back up your secret recovery phrase securely.
- **Fund Your Wallet**: Ensure your account holds native XLM for network transaction fees and stablecoins (like USDC) for booking flights.

## 2. Flight Search & Exploration

Use the Traqora Flight Search interface to find available flights:

- **Origin & Destination**: Enter 3-letter IATA airport codes (e.g., `JFK` to `LAX`).
- **Dates**: Select your departure and optional return dates, or use the date-flex search window (+/- 1, 3, or 7 days).
- **Passengers & Cabin Class**: Choose the number of passengers (1-9) and preferred cabin class (Economy, Premium Economy, Business, First Class).

## 3. Booking & Smart Contract Escrow

When you select a flight and proceed to book:

- **Seat Reservation**: The smart contract locks your chosen seat and initializes a secure booking record.
- **Payment Escrow**: Your payment is held securely in a Soroban smart contract escrow until flight fulfillment or cancellation occurs.
- **Booking Receipt**: Upon successful payment, a Soulbound Token (SBT) booking receipt is minted directly to your wallet as immutable proof of your reservation.

## 4. Wallet Requirements & Gas Fees

- **Minimum Balances**: Keep a small amount of XLM (at least 2-5 XLM) in your wallet for network transaction fees (gas).
- **Token Support**: Stellar USDC is the primary currency for flight settlements.

## 5. Support & Dispute Resolution

- **Automated Refunds**: If your flight is eligible for cancellation and refund within policy windows, you can trigger automated escrow refunds through your booking dashboard.
- **Dispute Resolution**: In case of travel disputes or service failures, decentralized arbitration contracts allow assigned arbiters or jury panels to fairly resolve escrow releases.
- **Community & Help**: Reach out via the official Traqora governance channels, GitHub issues, or support portal for assistance.
