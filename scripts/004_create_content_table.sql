-- Create site content table
CREATE TABLE site_content (
    id SERIAL PRIMARY KEY,
    content_key VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    section VARCHAR(255) NOT NULL,
    updated_by INTEGER REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);