CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    imageUrl VARCHAR(255),
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);
