# Willy Wonka Web App Final

This is a web app for Willy Wonka that allows you to add and keep track of tickets.

When a user creates a ticket their ticket info will be stored in a sqlite database. Along with the input fields, a random number will be stored with each ticket to determine whether it is a golden ticket or not. If it is, then it will be colored gold on the page.

## Resource


* entrant_name (string): The name of the entrant
* entrant_age (int): The age of the entrant
* guest_name (string): The name of the guest
* random_token (int): A random number between 0-6 (inclusive)

## DB Schema

I used an SQLite database for this app. Here are the schemas:

```sql
CREATE TABLE inventory (
    id INTEGER PRIMARY KEY,
    entrant_name TEXT,
    entrant_age INTEGER,
    guest_name TEXT,
    random_token INTEGER,
);
```
## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Get all tickets | GET | /tickets
Post ticket | POST | /tickets