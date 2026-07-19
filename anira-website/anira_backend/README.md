# ANIRA Backend

This is the .NET 9 Web API backend for the ANIRA E-Commerce platform.

## Prerequisites
- .NET 9 SDK
- PostgreSQL Server

## Setup

1. **Database**
   Apply `db_changelog.txt` to a fresh PostgreSQL database:
   ```bash
   psql -d anira -f db_changelog.txt
   ```
   *Ensure the database `anira` exists before running the script, or create it first with `createdb anira`.*

2. **Run Backend**
   Restore dependencies and run the application:
   ```bash
   dotnet restore
   dotnet run
   ```

The application will start on `https://localhost:7001` or the port configured in `Properties/launchSettings.json`.
Access the Swagger UI at `/swagger` in development.
