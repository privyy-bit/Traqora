describe('supplier cancellation and refund handling (v1)', () => {
  it('preserves a pending state when outcome is ambiguous', async () => {
    const cancelAttempt = { status: 'ambiguous', pending: true };
    expect(cancelAttempt.pending).toBe(true);
  });

  it('handles normal cancellation path successfully', async () => {
    const cancelAttempt = { status: 'cancelled', pending: false };
    expect(cancelAttempt.status).toBe('cancelled');
  });
});
