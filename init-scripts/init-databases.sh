#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE auth_db;
    CREATE DATABASE patient_db;
    CREATE DATABASE doctor_db;
    CREATE DATABASE appointment_db;
EOSQL