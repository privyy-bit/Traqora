# Supplier Cancellation and Refunds (v1)

## Overview
Traqora supports supplier cancellation verification with preservation of a pending state when outcomes are ambiguous.

## Operational Behavior
- Normal cancellation transitions bookings/flights to cancelled.
- Ambiguous downstream timeouts or responses trigger a `pending_c` or pending verification state to prevent premature data inconsistency.
