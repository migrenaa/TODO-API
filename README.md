# Running the application

## 1. Prerequisites

* docker
* docker compose
* Internet connection

## 2. Run the application

Run `docker-compose up` in the console. It will install all packages, build and run the application.
You will know that the application is up and running when you see this message:
`info: TODO API is listening on port 3005`

## 3. Documentation and Testing the application

Go to `http://localhost:3005/api/docs`
You will see a swagger page with all available endpoints.

## 4. Known issues

* The endpoint
    `PUT api/user/userId/lists/listId` doesn't update the list name.
* More logging should be introduced.
* The application should has at least one integration test and CI
* There is no authentication. My plan was to have a fake one, sending the userID in the header of all requests. This way in the controllers I can simulate real check if the user has permissions to modify/list resources.
* The DI integation should be finished.
* Some of the response models should be changes.
	* `GET /user/{userId}/list/{listId}` returns listId in the Items object in the response model. It should be removed.
