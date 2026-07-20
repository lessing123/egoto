SELECT 'CREATE DATABASE egoto' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'egoto')\gexec
