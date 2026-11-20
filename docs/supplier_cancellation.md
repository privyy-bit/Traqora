# Supplier Cancellation and Refund Operations

V1 supplier cancellation implements safe two-step state handling to prevent ambiguous outcomes and potential race conditions during operational emergencies.

## State Flow
1. **Active**: The flight is fully operational.
2. **Pending**: When the supplier initiates cancellation on an active flight, it transitions to a `pending` state.
3. **Cancelled**: Subsequent confirmation or re-invocation transitions the `pending` flight to `cancelled`, safely preserving state and triggering refund reconciliation hooks.

## Authorization
Only the registered and verified airline address authorized for the specific flight may invoke `cancel_flight`.