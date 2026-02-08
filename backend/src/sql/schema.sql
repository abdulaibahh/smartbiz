CREATE TABLE businesses(
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 address TEXT,
 logo TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 business_id INT REFERENCES businesses(id),
 full_name TEXT,
 email TEXT UNIQUE,
 password_hash TEXT,
 role TEXT CHECK(role IN ('owner','staff')) DEFAULT 'owner',
 active BOOLEAN DEFAULT TRUE
);

CREATE TABLE subscriptions(
 id SERIAL PRIMARY KEY,
 business_id INT,
 plan TEXT,
 start_date TIMESTAMP,
 end_date TIMESTAMP,
 active BOOLEAN DEFAULT TRUE
);

CREATE TABLE customers(
 id SERIAL PRIMARY KEY,
 business_id INT,
 full_name TEXT,
 phone TEXT,
 balance NUMERIC DEFAULT 0
);

CREATE TABLE sales(
 id SERIAL PRIMARY KEY,
 business_id INT,
 user_id INT,
 customer_id INT,
 total NUMERIC,
 paid NUMERIC,
 payment_method TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
