require("dotenv").config();
const pg = require("pg");

async () => {
  const usersTable = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT PRIMARY KEY ALWAYS AS IDENTITY NOT NULL,
            created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            email VARCHAR(100)  NOT NULL UNIQUE,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50)
        )
    `;

  const ticketsTable = `
        CREATE TABLE IF NOT EXISTS Tickets (
            id INT PRIMARY KEY ALWAYS AS IDENTITY NOT NULL,
            created_by_user_id INT NOT NULL
            created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            modified_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            issue VARCHAR(100) NOT NULL,
            priority VARCHAR(50) NOT NULL,
            resolved BOOLEAN DEFAULT false,
            FOREIGN KEY (created_by_user_id) REFERENCES USERS(id)
            
        )`;
};
