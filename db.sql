CREATE DATABASE booking_app;


CREATE TABLE backup_terms (
    unique_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    term_id BIGSERIAL,
    term_description text,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    column is_bold boolean;  
);
CREATE TABLE terms_and_conditions (
    unique_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    term_id BIGSERIAL,
    term_description text,
    created_at TIMESTAMP,
    updated_at TIMESTAMP ,
    column is_bold boolean; 
);

CREATE TABLE tickets(
   unique_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id BIGSERIAL,
    customer_name VARCHAR(50),
    customer_email VARCHAR(50),
    customer_phone VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    unit_fault varchar(50),
    unit_status varchar(50),
    type_of_unit varchar(40),
    ticket_number text,
    custom_uuid uuid
);