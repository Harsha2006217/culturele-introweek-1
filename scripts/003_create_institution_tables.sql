-- Create institutions table
CREATE TABLE institutions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    general_email VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    logo_url TEXT,
    postal_address TEXT NOT NULL,
    visit_address TEXT NOT NULL,
    description TEXT NOT NULL,
    activity_description TEXT NOT NULL,
    capacity_per_slot INTEGER NOT NULL,
    program_duration INTEGER NOT NULL CHECK (program_duration IN (60, 75, 90)),
    comments TEXT,
    edit_token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create institution availability table
CREATE TABLE institution_availability (
    id SERIAL PRIMARY KEY,
    institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(institution_id, date, start_time)
);