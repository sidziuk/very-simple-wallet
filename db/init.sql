-- Wallets table
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    balance_czk NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    balance_eur NUMERIC(12, 2) NOT NULL DEFAULT 0.00
);

-- Transactions table (excluding transfers between wallets)
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    wallet_id INTEGER NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    currency VARCHAR(3) NOT NULL,
    type VARCHAR(10) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    note TEXT,

    CONSTRAINT chk_currency CHECK (currency IN ('CZK', 'EUR')),
    CONSTRAINT chk_type CHECK (type IN ('DEPOSIT', 'WITHDRAWAL'))
);

-- Index for fetching all transactions for a specific wallet,
-- with filter and ordering optimization
CREATE INDEX idx_transactions_wallet_currency_date
    ON transactions(wallet_id, currency, created_at DESC);