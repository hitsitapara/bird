const db = require('../config/db');
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL for database setup.');

    // Create the database if it doesn't exist
    db.query('CREATE DATABASE IF NOT EXISTS employees_db', (err) => {
        if (err) {
            console.error('Error creating database:', err);
        } else {
            console.log('Database created or already exists.');

            // Use the database
            db.changeUser({ database: 'birdvision' }, (err) => {
                if (err) {
                    console.error('Error switching to database:', err);
                } else {
                    // Create the employees table if it doesn't exist
                    const createTableQuery = `
                        CREATE TABLE IF NOT EXISTS employees (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            email VARCHAR(255) UNIQUE NOT NULL,
                            position VARCHAR(255) NOT NULL,
                            salary DECIMAL(10, 2) NOT NULL,
                            date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
                            date_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                        );
                    `;

                    db.query(createTableQuery, (err) => {
                        if (err) {
                            console.error('Error creating table:', err);
                        } else {
                            console.log('Employees table created or already exists.');
                        }
                        db.end();
                    });
                }
            });
        }
    });
});