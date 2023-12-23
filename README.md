# PhilEvent
Introducing PhilEvent, a dedicated event aggregation platform designed to address the absence of a centralized hub for event information in the Philippines. The current fragmented landscape makes it challenging for both enthusiasts and organizers to access comprehensive details about upcoming activities. PhilEvent bridges this gap by employing web scraping techniques to gather information from various sources, consolidating it into a single, accessible database. Developed using ReactJS, a dynamic and responsive JavaScript toolkit, the platform ensures a consistent user experience with interactive elements for enhanced engagement. Real-time updates through web scraping technology keep PhilEvent current, providing users with the latest information on diverse events across the country. Join us in creating a vibrant and connected event community, where you can explore, stay informed, and make the most of your event experiences.

## Systems Used
* MySQL (Database)
* Python (Webscraper)
* ReactJS (WebApp)

## Prerequisites

Before running the application, make sure you have the following prerequisites:

### 1. Python Libraries
Open a terminal and install the required Python libraries:
```
pip install beautifulsoup4
pip install mysql-connector-python
pip install lxml
```

### 2. Database Setup
* Open XAMPP and start both Apache and MySQL.
* In phpMyAdmin, create a table named "philevent" and import the philevent.sql file.

### 3. Running the Application
Follow these steps to run the PhilEvent application:

- Install Node Libraries\
Run the following command to install the required Node libraries:
```npm install```

- Configure MySQL Connection\
If you have set a username and password for your phpMyAdmin, update the following files with your credentials:
```
src/server/server.js (Line 639 and 640)
src/server/webscrapper.js (Line 9 and 10)
```
- Run the Program\
Execute the following command to start the application:
```npm start```\
(Depending on your system, it might take a while to start due to the webscraper running and pushing data to the database)

## For API Documentation, Run the program and go to http://localhost:8080/api-docs/

