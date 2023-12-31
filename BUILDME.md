
# Node & React Project Build

## Step 1: Clone the repository
```powershell
git clone https://github.com/valoubinouz/NodeLearningWebApp.git
cd NodeLearningWebApp
```
Ensure that NodeJs is installed.


## Step 2: Install project dependencies
```powershell
npm install
```


## Step 3: Create a PostgreSQL database
Ensure that PostgreSQL is installed and running.

### Database creation

Create a database named LearningFactDb with the provided credentials in sequelize.ts

To create the database you can use `psql` or the pgAdmin software :

### Using psql command line:

Open a terminal and enter `psql` to access the PostgreSQL command line.

Inside the PostgreSQL shell, run the following commands to create the database and user:

```sql
CREATE DATABASE LearningFactDb;
CREATE USER learningDbUser WITH PASSWORD 'root';
ALTER ROLE learningDbUser SET client_encoding TO 'utf8';
ALTER ROLE learningDbUser SET default_transaction_isolation TO 'read committed';
ALTER ROLE learningDbUser SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE LearningFactDb TO learningDbUser;
```
Exit the PostgreSQL shell by typing \q.

### Using pgAdmin:

Open pgAdmin and connect to your PostgreSQL server.

Right-click on "Databases" and choose "Create > Database." Name it LearningFactDb.

Right-click on "Login/Group Roles" and choose "Create > Login/Group Role." Name it learningDbUser, set the password to 'root', and grant it all privileges.


## Step 4: Run the Node.js backend
```powershell
cd backend
node app.js
```


## Step 5: Run the Angular frontend
```powershell
cd ../frontend
npm install
ng serve
```
