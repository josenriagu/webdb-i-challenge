# Database Queries

## Find all customers with postal code 1010

SELECT * `specifies what to select, in this case, all columns`
FROM Customers `specifies what table to scan`
WHERE PostalCode = 1010 `specifies the condition(s) to be matched`
LIMIT 3; `specifies the limit to the number of result returned`

## Find the phone number for the supplier with the id 11

SELECT Phone
FROM Suppliers
WHERE SupplierID = 11;

## List first 10 orders ever places, descending by the order date

SELECT *
FROM Orders
ORDER BY OrderDate
DESC
LIMIT 10;

## Find all customers that live in London, Madrid, or Brazil

SELECT *
FROM Customers
WHERE City IN ("London","Madrid")
OR
Country IN ("Brazil");

## Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"

INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", "111", "Middle Earth");

## Update Bilbo Baggins record so that the postal code changes to "11122"

UPDATE Customers
SET PostalCode = "11122"
WHERE PostalCode = "111";

## (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted

SELECT DISTINCT City `specifies that row values returned must not be repeated`
FROM Customers;

SELECT COUNT (DISTINCT City) `counts and returns the total number of distinct cities`
FROM Customers;

## (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name

SELECT SupplierName
FROM Suppliers
WHERE length(SupplierName) > 20;
