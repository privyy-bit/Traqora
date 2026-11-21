use soroban_sdk::{Env, Address};
use refund::{RefundClient, RefundStatus};
use refund::RefundContract;
use soroban_sdk::Symbol;
use integration_tests::{generate_actors, new_env, register_contracts};

#[test]
fn test_supplier_cancellation_ambiguous_state_preservation() {
    let env = Env::default();
    env.mock_all_auths();
    let admin = Address::generate(&env);
    let contract_id = env.register(refund::RefundContract, ());
    let client = RefundClient::new(&env, &contract_id);
    client.initialize(&admin);

    let passenger = Address::generate(&env);
    let refund_id = client.request_refund(&passenger, &100);

    // Test ambiguous supplier cancellation preserves pending state
    client.process_supplier_cancellation(&refund_id, &true);
    let ref_data = client.get_refund(&refund_id);
    assert_eq!(ref_data.status, RefundStatus::Pending);

    // Process subsequently
    client.process_refund(&refund_id);
    let ref_data_after = client.get_refund(&refund_id);
    assert_eq!(ref_data_after.status, RefundStatus::Processed);
}


#[test]
fn test_set_policy_and_calculate_refund() {
    let env = new_env();
    let actors = generate_actors(&env);
    let contracts = register_contracts(&env);
    contracts.refund.initialize(&actors.admin);

    contracts.refund.set_refund_policy(
        &actors.airline,
        &86_400, // 24h
        &10_000, // 100%
        &5_000,  // 50%
        &3_600,  // 1h
    );

    // Far from departure -> full refund
    let original = 100_0000000i128;
    let departure_far = env.ledger().timestamp() + 200_000;
    let amt_full = contracts
        .refund
        .calculate_refund(&actors.airline, &original, &departure_far);
    assert_eq!(amt_full, original);

    // Between windows -> partial
    let departure_mid = env.ledger().timestamp() + 10_000;
    let amt_partial = contracts
        .refund
        .calculate_refund(&actors.airline, &original, &departure_mid);
    assert_eq!(amt_partial, original / 2);

    // Within no refund window -> 0
    let departure_soon = env.ledger().timestamp() + 1_000;
    let amt_none = contracts
        .refund
        .calculate_refund(&actors.airline, &original, &departure_soon);
    assert_eq!(amt_none, 0);
}

#[test]
fn test_request_and_process_refund() {
    let env = new_env();
    let actors = generate_actors(&env);
    let contracts = register_contracts(&env);
    contracts.refund.initialize(&actors.admin);

    let rid = contracts.refund.request_refund(
        &actors.passenger,
        &12345,
        &50_0000000i128,
        &Symbol::new(&env, "USDC"),
        &Symbol::new(&env, "cancelled"),
    );
    let r = contracts.refund.get_refund_request(&rid).unwrap();
    assert_eq!(r.status, Symbol::new(&env, "pending"));

    contracts.refund.process_refund(&actors.admin, &rid);
    let r2 = contracts.refund.get_refund_request(&rid).unwrap();
    assert_eq!(r2.status, Symbol::new(&env, "approved"));
    assert!(r2.processed_at.is_some());
}
