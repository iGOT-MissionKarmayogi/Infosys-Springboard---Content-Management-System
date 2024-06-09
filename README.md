# Infosys-Springboard---Content-Management-System

## Installation Guide

This project consists of three main folders:
- **CMS**: A Strapi CMS for managing content.
- **Backend**: A Python-based wrapper API.
- **Frontend**: A React application.

### Prerequisites

- Node.js and npm installed on your machine.
- Python and pip installed on your machine.

### Step 1: Clone the Repository

First, clone the repository to your local machine.

```sh
git clone https://github.com/Amit-Shriram/Infosys_Project.git
cd Infosys_Project
```

### Step 2: Set Up the Backend(Wrapper API)

1. Navigate to the `Backend` folder and install the required Python packages.

    ```sh
    cd Backend
    pip install sqlite3 url-parser Flask Flask-Cors Flask-SocketIO requests imaginesdk
    ```

2. Run the wrapper API.

    ```sh
    python try4socket.py
    ```

3. Get Wrapper API.
    ```sh
    http://127.0.0.1:5000/data/<your_collection_name>
    ```
   for example:-
   As I have a collection name of bikeinfo in my CMS so I can access the data for bikeinfo collection as
   ```sh
   http://127.0.0.1:5000/data/bikeinfo
   ```

### Step 3: Set Up the CMS

1. Navigate to the `CMS` folder and then `my-project` and install the required dependencies.

    ```sh
    cd CMS/my-project
    npm install
    ```

2. Run the Strapi CMS.

    ```sh
    npm run develop
    ```

3. Create an admin user and log in to the Strapi CMS.
4. Get the CMS's APIs 
    ```sh
    http://localhost:1337/api/bikeinfos?populate=*
    ```
    ```sh
    http://localhost:1337/api/<your_collection_name>?populate=*
    ```

### Step 4: Set Up the Frontend

1. Navigate to the `Frontend` folder, then to the `bike` folder, and install the required dependencies.

    ```sh
    cd /Frontend/bike
    npm install
    ```

2. Run the React application.

    ```sh
    npm run dev
    ```
