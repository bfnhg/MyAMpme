# ASP.NET Core Web API with EF and MySQL :
This repository contains the source code for an AM-PME ASP.NET Core Web API application that uses Entity Framework Core and MySQL as its database. The API provides a set of RESTful endpoints for performing various operations, such as retrieving data or creating new resources. This project also includes implementation of JSON Web Token (JWT) authentication.
## Requirements

To run this application, you will need the following :

* .NET Core 6.0 SDK
* A code editor, such as Visual Studio or Visual Studio Code
* An internet connection (for downloading dependencies)
* A MySQL database

## Getting Started

1. Clone this repository to your local machine by running the following command in your terminal:

  ```sh
   git clone https://github.com/youssef-ettafssaoui/AM-PME-ASP-API.git
  ```
2. Change into the directory where you cloned the repository :
  ```sh 
    cd AM-PME-ASP-API
  ```
3. Restore the required dependencies by running the following command :
  ```sh 
    dotnet restore
  ```
4. Set up the MySQL database :
* Create a new database in MySQL Server
* Open the appsettings.json file and update the DefaultConnection string to match your database credentials
* Run the following command to apply the migrations :
  ``` dotnet ef database update ```
5. Build the application by running the following command :
  ```sh 
    dotnet build
  ```
6. Start the application by running the following command :

  ```sh 
    dotnet run
  ```
Open your web browser and navigate to https://localhost:5001 to view the API.

## Endpoints
The API provides the following endpoints :

* GET /api/[controller] : Retrieve a list of resources
* GET /api/[controller]/{id} : Retrieve a specific resource by ID
* POST /api/[controller] : Create a new resource
* PUT /api/[controller]/{id} : Update an existing resource
* DELETE /api/[controller]/{id} : Delete a specific resource by ID

## Contributing :
If you would like to contribute to this repository, please fork it and submit a pull request with your changes. Before submitting your changes, make sure to run the tests and ensure that they all pass.

## License :

This repository is licensed under the ALIDANTEK INC - MAROC License.
