USE smartshop_ai;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE products;
TRUNCATE TABLE categories;

SET FOREIGN_KEY_CHECKS = 1;

-- =========================================================
-- Categories
-- =========================================================

INSERT INTO categories (name, description)
VALUES
    ('Laptops', 'Portable computers for study and everyday work'),
    ('Mobile Devices', 'Tablets and portable mobile technology'),
    ('Accessories', 'Computer and study accessories'),
    ('Audio', 'Headphones and audio equipment');


-- =========================================================
-- Products
-- =========================================================

-- 1. HP Pavilion 15
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'HP Pavilion 15',
    'A versatile laptop suitable for university study, office work and everyday productivity.',
    999.00,
    12,
    JSON_OBJECT(
        'brand', 'HP',
        'ram', '16GB',
        'storage', '512GB SSD',
        'screen', '15.6 inch'
    )
FROM categories
WHERE name = 'Laptops';


-- 2. Samsung Galaxy Tab A9
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'Samsung Galaxy Tab A9',
    'A compact tablet suitable for study, streaming and everyday mobile use.',
    349.00,
    18,
    JSON_OBJECT(
        'brand', 'Samsung',
        'storage', '128GB',
        'connection', 'Wi-Fi',
        'screen', '8.7 inch'
    )
FROM categories
WHERE name = 'Mobile Devices';


-- 3. Logitech K380 Keyboard
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'Logitech K380 Keyboard',
    'Compact Bluetooth keyboard suitable for study and multi-device use.',
    69.95,
    25,
    JSON_OBJECT(
        'brand', 'Logitech',
        'connection', 'Bluetooth',
        'feature', 'Multi-device'
    )
FROM categories
WHERE name = 'Accessories';


-- 4. Anker 65W USB-C Charger
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'Anker 65W USB-C Charger',
    'Fast USB-C charger suitable for compatible laptops, tablets and smartphones.',
    79.95,
    30,
    JSON_OBJECT(
        'brand', 'Anker',
        'power', '65W',
        'connection', 'USB-C'
    )
FROM categories
WHERE name = 'Accessories';


-- 5. HP Adjustable Laptop Stand
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'HP Adjustable Laptop Stand',
    'Adjustable laptop stand designed to improve desk ergonomics and airflow.',
    54.95,
    20,
    JSON_OBJECT(
        'brand', 'HP',
        'feature', 'Adjustable',
        'material', 'Aluminium'
    )
FROM categories
WHERE name = 'Accessories';


-- 6. JBL Tune 520BT Headphones
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'JBL Tune 520BT Headphones',
    'Wireless Bluetooth headphones designed for study, music and online meetings.',
    89.00,
    22,
    JSON_OBJECT(
        'brand', 'JBL',
        'connection', 'Bluetooth',
        'feature', 'Wireless'
    )
FROM categories
WHERE name = 'Audio';


-- 7. Belkin USB-C Hub
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'Belkin USB-C Hub',
    'Multi-port USB-C hub for connecting displays, storage and other peripherals.',
    64.95,
    16,
    JSON_OBJECT(
        'brand', 'Belkin',
        'ports', 'USB-C, USB-A, HDMI',
        'connection', 'USB-C'
    )
FROM categories
WHERE name = 'Accessories';


-- 8. Microsoft Bluetooth Mouse
INSERT INTO products
(category_id, name, description, price, stock, specifications)
SELECT
    category_id,
    'Microsoft Bluetooth Mouse',
    'Compact wireless mouse suitable for study, work and travel.',
    39.95,
    35,
    JSON_OBJECT(
        'brand', 'Microsoft',
        'connection', 'Bluetooth',
        'feature', 'Portable'
    )
FROM categories
WHERE name = 'Accessories';