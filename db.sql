CREATE DATABASE booking_app;


CREATE TABLE backup_terms (
    unique_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    term_id BIGSERIAL,
    term_description text,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    is_bold boolean
);
INSERT INTO backup_terms (term_description, created_at, is_bold) VALUES
('Option to have your data backed up and restored: cell phones, notes, and tablets', '2024-03-15 13:34:28.584', false),
('This advisory is applicable to cellular devices only and not units such as notebooks, PCs, etc.', '2024-03-15 13:34:28.584', false),
('Please note that software data backup  and restore procedures are not covered under Samsung''s warranty policies, thus this portion of the repair canbe performed but on a chargeable basis.', '2024-03-15 13:34:28.584', false),
('Should the repair to your device entail a software reload or mainboard replacement, stored data will be lost. If we are unable to access the defective device''s data, we can attempt to back up and restore your data.', '2024-03-15 13:34:28.584', false),
('Data includes: Contacts, Media & Documents, which may be backed up and restored, if accessible and if not corrupted.', '2024-03-15 13:34:28.584', false),
('We do not back up and restore any non-factory standard applications, 3rd party applications (such as WhatsApp), programs, Microsoft, or other Office suites.', '2024-03-15 13:34:28.584', true),
('These will have to be uploaded and/or reinstalled again by yourself.', '2024-03-15 13:34:28.584', false),
('Service fee to undertake data backup and restore - R550', '2024-03-15 13:34:28.584', true),
('Please note that the above relates specifically to devices that require resolutions whereby the stored data may be affected in order to affect a successful repair.', '2024-03-15 13:34:28.584', false),
('Should the repair be of such a nature that the stored data will not be affected (e.g., LCD, battery replacement, etc.), then there''s no backup and restore procedure required, and the service fee is then not applicable.', '2024-03-15 13:34:28.584', false),
('Although extreme care and all efforts are taken in order not to lose any data, neither Samsung nor its contracted service agent can be held unconditionally responsible and/or liable if your data is irretrievable, lost, or corrupted during the repair process and/or backup and restore procedures.', '2024-03-15 13:34:28.584', false),
('As these procedures can take up to 3–5 hours, we recommend that you leave your device with us to allow enough time for the above to be performed in the proper manner. There is no charge (for data backup and restore) should your data be irretrievable if we are unable to successfully perform the backup and restore procedures or if the repair is not software or main board related.', '2024-03-15 13:34:28.584', false),
('Should the quote not be accepted and the repair resolution is to undertake the required repairs to the device on a no-charge basis, all your stored data will be lost in the process.', '2024-03-15 13:34:28.584', false),
('The above terms and conditions are applicable to devices that are in and out of warranty.', '2024-03-15 13:34:28.584', false),
('However, should your device be out of the warranty period and have additional hardware-related fault(s), you will be quoted once the unit has undergone a technical assessment.', '2024-03-15 13:34:28.584', false);

CREATE TABLE terms_and_conditions (
    unique_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    term_id BIGSERIAL,
    term_description text,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    is_bold boolean 
);
INSERT INTO terms_and_conditions (term_description, created_at, is_bold) VALUES
('In order to protect your property, repairs will only be returned upon presentation of your receipt.', '2024-03-18 09:33:47.457', false ),
('When handing over your product for repair, please remove your SIM card, battery, charger, and all accessories. Samsung and/or its Authorized Service Center will not be liable for any loss of SIM card, battery, charger, or any other accessory unless duly signed in at the time of handing the product for repair.', '2024-03-18 09:33:47.457', false ),
('Samsung and/or its authorized service center will not be held liable for any loss incurred as a result of robbery or forced entry to our premises.', '2024-03-18 09:33:47.457', false ),
('Any repairs not collected within 30 days of repair completion, after notification to the customer, will be sold to defray expenses.', '2024-03-18 09:33:47.457', true ),
('Samsung and/or its authorized service center will be deemed authorized to undertake any repairs should the cost be less than the minimum amount of the quotation provided by Samsung and/or its authorized service center.', '2024-03-18 09:33:47.457', false ),
('This service order or job card does not authorize any exchange for your device. All exchanges for a device must be authorized separately in writing by Samsung. Any handwritten notes made on this service order or job card that provide for an exchange of the device that is granted verbally by Samsung or its authorized service center are not permitted, and an exchange of your device will not be provided in such instances.', '2024-03-18 09:33:47.457', true ),
('Once the quotation is accepted by yourself, Samsung will be deemed authorized to replace parts and materials as may be necessary, provided the costs do not exceed the value of the quotation provided.', '2024-03-18 09:33:47.457', false ),
('A minimum assessment or quotation rejection fee of R250 will be charged on all repairs that are not covered by the manufacturer warranty terms and conditions.', '2024-03-18 09:33:47.457', true ),
('Repairs to liquid- or corrosion-damaged products will not be performed under warranty conditions. This is specified within the owner''s manual warranty terms and conditions. Repair, however, can be offered at a cost to you, the end-user.', '2024-03-18 09:33:47.457', false ),
('All non-warranty repairs are on a C.O.D. basis, and Samsung and/or its authorized service center will not dispatch any product repaired until payment in respect of such repairs has been received in full. Payments can be made either by cash or credit card. No checks will be accepted.', '2024-03-18 09:33:47.457', false ),
('All repairs undertaken, save those in respect of corrosion, physical damage, and/or liquid damage, are guaranteed against faulty workmanship for a maximum period of 90 days from the date of receipt by the customer.', '2024-03-18 09:33:47.457', false ),
('Samsung and/or its authorized service center will not be responsible for the loss of any data on any phone handed in for repair. It is your responsibility to ensure that all data is backed up safely.', '2024-03-18 09:33:47.457', true );


CREATE TABLE tickets(
   unique_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id BIGSERIAL,
    customer_fullname VARCHAR(50),
    customer_email VARCHAR(50),
    customer_phone VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    unit_fault varchar(50),
    unit_status varchar(50),
    type_of_unit varchar(40),
    ticket_number text,
    service_order_number varchar(10),
    customer_signature text,
    custom_uuid uuid
);

