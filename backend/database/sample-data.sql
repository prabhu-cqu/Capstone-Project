USE smartshop_ai;

INSERT INTO categories (name, description)
VALUES
    ('Laptops', 'Portable computers for study, work and everyday use'),
    ('Accessories', 'Computer and study accessories'),
    ('Audio', 'Headphones, speakers and audio equipment')
ON DUPLICATE KEY UPDATE
    description = VALUES(description);

INSERT INTO products
    (category_id, name, description, price, stock, specifications)
SELECT
    c.category_id,
    'Lenovo IdeaPad 5',
    'A reliable laptop suitable for university study and everyday productivity.',
    899.00,
    15,
    JSON_OBJECT(
        'brand', 'Lenovo',
        'ram', '16GB',
        'storage', '512GB SSD',
        'screen', '15.6 inch'
    )
FROM categories c
WHERE c.name = 'Laptops'
AND NOT EXISTS (
    SELECT 1 FROM products
    WHERE name = 'Lenovo IdeaPad 5'
);

INSERT INTO products
    (category_id, name, description, price, stock, specifications)
SELECT
    c.category_id,
    'Logitech Wireless Mouse',
    'A comfortable wireless mouse for study and office use.',
    29.95,
    40,
    JSON_OBJECT(
        'brand', 'Logitech',
        'connection', 'Wireless',
        'battery', 'AA'
    )
FROM categories c
WHERE c.name = 'Accessories'
AND NOT EXISTS (
    SELECT 1 FROM products
    WHERE name = 'Logitech Wireless Mouse'
);

INSERT INTO products
    (category_id, name, description, price, stock, specifications)
SELECT
    c.category_id,
    'USB-C Laptop Hub',
    'A multi-port USB-C hub for connecting additional devices.',
    49.90,
    25,
    JSON_OBJECT(
        'ports', 'USB-C, USB-A, HDMI',
        'connection', 'USB-C'
    )
FROM categories c
WHERE c.name = 'Accessories'
AND NOT EXISTS (
    SELECT 1 FROM products
    WHERE name = 'USB-C Laptop Hub'
);

INSERT INTO products
    (category_id, name, description, price, stock, specifications)
SELECT
    c.category_id,
    'Sony Wireless Headphones',
    'Wireless headphones designed for study, music and online meetings.',
    129.00,
    20,
    JSON_OBJECT(
        'brand', 'Sony',
        'connection', 'Bluetooth',
        'feature', 'Noise reduction'
    )
FROM categories c
WHERE c.name = 'Audio'
AND NOT EXISTS (
    SELECT 1 FROM products
    WHERE name = 'Sony Wireless Headphones'
);

INSERT INTO products
    (category_id, name, description, price, stock, specifications)
SELECT
    c.category_id,
    'JBL Portable Speaker',
    'A compact portable speaker for indoor and outdoor listening.',
    79.00,
    18,
    JSON_OBJECT(
        'brand', 'JBL',
        'connection', 'Bluetooth',
        'feature', 'Portable'
    )
FROM categories c
WHERE c.name = 'Audio'
AND NOT EXISTS (
    SELECT 1 FROM products
    WHERE name = 'JBL Portable Speaker'
);

-- Add product images
UPDATE products
SET image_url = CASE name
  WHEN 'Lenovo IdeaPad 5' THEN
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'
  WHEN 'Logitech Wireless Mouse' THEN
    'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80'
  WHEN 'USB-C Laptop Hub' THEN
    'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80'
  WHEN 'Sony Wireless Headphones' THEN
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
  WHEN 'JBL Portable Speaker' THEN
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80'
  ELSE image_url
END
WHERE name IN (
  'Lenovo IdeaPad 5',
  'Logitech Wireless Mouse',
  'USB-C Laptop Hub',
  'Sony Wireless Headphones',
  'JBL Portable Speaker'
);