## Important Links

- [ER Diagram Link](https://drive.google.com/file/d/14HRVRY1f443zaUQKPO0yJA5NM7DCHVwv/view?usp=sharing)

## Project Discussion:

The Gym Class Scheduling and Membership Management System is designed to manage gym operations efficiently. The system defines three roles: Admin, Trainer, and Trainee, each with specific permissions. Admins are responsible for creating and managing trainers, scheduling classes, and assigning trainers to these schedules. Each day can have a maximum of five class schedules, with each class lasting two hours. Trainers conduct the classes and can view their assigned class schedules but cannot create new schedules or manage trainee profiles. Trainees can create and manage their own profiles and book class schedules if there is availability, with a maximum of ten trainees per schedule.

The system enforces several business rules to ensure smooth operations. Admins are limited to scheduling a maximum of 5 classes per day, and each schedule can accommodate no more than 10 trainees. If a class schedule reaches its capacity, trainees will be prevented from making further bookings, and admins cannot create additional schedules beyond the daily limit. JWT-based authentication is implemented to control access, ensuring that only authorized users can perform specific actions, such as booking classes or managing trainers. Robust error handling is integrated throughout the system, addressing issues such as unauthorized access, validation errors, and booking limit violations. This system provides an organized and flexible solution for managing gym class scheduling and membership, with well-defined roles and responsibilities.

### Business Rules:

- Authentication:
  - All users must authenticate using JWT tokens to perform actions within the system.
  - Trainees can create and manage their own profiles.
  - Only admins can create and manage trainers.
- Roles and Permissions:
  - Admin: Responsible for creating trainers, managing class schedules, and assigning trainers to classes. Admins cannot create or manage trainee profiles.
  - Trainer: Trainers can view their assigned class schedules but cannot create new schedules or manage trainee profiles.
  - Trainee: Trainees can create their own profiles, book classes, and manage their bookings but cannot create or manage trainers or schedules.
- Class Scheduling:
  - Each day is limited to a maximum of 5 class schedules.
  - Each class schedule lasts for 2 hours.
  - The system enforces a maximum of 10 trainees per class schedule. Once the limit is reached, no additional bookings can be made for that schedule.
  - Admins are responsible for scheduling classes and assigning trainers.
- Booking System:
  - Trainees can book class schedules if the schedule has available slots (maximum of 10 trainees per schedule).
  - A trainee cannot book more than one class in the same time slot.
  - Trainees can cancel their bookings if needed.
- Admin CRUD for trainer data (use CRUD here):
  - Admin will be able to create the trainer.
  - Admin will be able to update the trainer data.
  - Admin will be able to delete the trainer data.

### Functional Requirements

- Trainee User

  - Trainee User can register.
  - Trainee User can login.
  - Trainee User can update their profile.
  - Trainee User can book classes.
  - Trainee User can cancel classes.
  - Trainee User can view all booking (per day/for a week).

- Trainer User

  - Trainer User can login.
  - Trainer User can view their assigned classes.

- Admin User
  - Admin User can login.
  - Admin User can create Trainer User.
  - Admin User can update Trainer User Profile.
  - Admin User can delete a Trainer User.
  - Admin User can create time slot.
  - Admin User can create class schedule according to time slot and assign the Trainer with the class schedule.

### API Endpoints

- Auth
  - POST /auth/login
  - POST /auth/register
  - GET `[TRAINEE, ADMIN, TRAINER]` /auth/my-profile
  - PATCH `[TRAINEE]` /auth/update-my-profile

- User
  - POST `[ADMIN]` /users/create-trainer
  - PATCH `[ADMIN]` /users/update-user/6706d77a2730448761a0c8bd [can update only trainer info]
  - GET `[ADMIN]` /users

- Time Slot
  - POST `[ADMIN]` /timeslot
  - POST `[ADMIN]` /timeslot/670750e3060270e79ed94096
  - GET /timeslot
  - GET /timeslot/670750e3060270e79ed94096
  - DELETE `[ADMIN]` /timeslot/670750e3060270e79ed94096

- Class Schedule
  - GET `[TRAINER]` /class-schedule/trainer-schedule
  - GET `[TRAINER, TRAINEE, ADMIN]` /class-schedule
  - GET `[TRAINER, TRAINEE, ADMIN]` /class-schedule/6707d23107eba10bbd01b6ce
  - POST `[ADMIN]` /class-schedule
  - PATCH `[ADMIN]` /class-schedule/6707d23107eba10bbd01b6ce
  - DELETE `[ADMIN]` /class-schedule/6707d23107eba10bbd01b6ce

- Booking
  - POST `[TRAINEE]` /booking
  - PATCH `[TRAINEE]` /booking/6707d23107eba10bbd01b6ce
  - PATCH `[TRAINEE]` /booking/cancel/6707d23107eba10bbd01b6ce
  - GET `[TRAINEE]` /booking/my-bookings
  - GET `[ADMIN]` /booking
  - GET `[ADMIN]` /booking/6707d23107eba10bbd01b6ce

### `POST` Request Response
- Auth
  - POST /auth/register
  ```
  // request data
  {
    "name": "Example",
    "email": "example@gmail.com",
    "password": "123456"
  }

  // response data
  {
    "statusCode": 200,
    "success": true,
    "message": "Successfully registered",
    "data": {
        "user": {
            "name": "Example",
            "email": "example@gmail.com",
            "password": "$2b$10$oaAv9.fDGPkvozrPdO9g7OAXYHZe.EQu4yJiiT3vevf2GfNLNC",
            "role": "trainee",
            "_id": "67087e293bdd25cdb60385db",
            "createdAt": "2024-10-11T01:23:53.584Z",
            "updatedAt": "2024-10-11T01:23:53.584Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA4N2UyOTNiZGQyNWNkYjYwMzg1ZGIiLCJlbWFpbCI6ImFidWxrYXNlbTJAZ21haWwuY29tIiwicm9sZSI6InRyYWluZWUiLCJpYXQiOjE3Mjg2MDk4MzQsImV4cCI6MTczMTIwMTgzNH0"
    }
  }
  ```
  - POST /auth/login
    ```
    // request data
    {
      "email": "example@gmail.com",
      "password": "123456"
    }

    // response data
    {
      "statusCode": 200,
      "success": true,
      "message": "Successfully logged in",
      "data": {
          "user": {
              "email": "example@gmail.com",
              "name": "Example"
          },
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzA3N2M1YTJiM2E0NmU3MDczYjE4Y2QiLCJlbWFpbCI6InRyYWluZXIzQGdtYWlsLmNvbSIsInJvbGUiOiJ0cmFpbmVyIiwiaWF0IjoxNzI4NjA5NzAzLCJleHAiOjE3MzEyMDE3MDN"
      }
    }
    ```
  
- User
  - POST `[ADMIN]` /users/create-trainer
  ```
  // request data
  {
    "name": "Example",
    "email": "example@gmail.com",
    "password": "123456"
  }

  // response data
  {
    "statusCode": 201,
    "success": true,
    "message": "Successfully Created",
    "data": {
        "user": {
            "name": "Example",
            "email": "example@gmail.com",
            "password": "$2b$10$y9n3Ovg44ojKs5BOjyXnEOlIePaM.Bs9s8QvEk/UUtZ2Lu31YeJqa",
            "role": "trainer",
            "_id": "67087f343bdd25cdb60385df",
            "createdAt": "2024-10-11T01:28:20.058Z",
            "updatedAt": "2024-10-11T01:28:20.058Z",
            "__v": 0
        }
    }
  }
  ```

- Time Slot
  - POST `[ADMIN]` /timeslot
  ```
  // request data
  {
    "startingTime": "20:00",
    "endingTime": "22:00"
  }

  // response data
  {
    "statusCode": 201,
    "success": true,
    "message": "Successfully Created",
    "data": {
        "startingTime": "22:00",
        "endingTime": "24:00",
        "createdBy": {
            "_id": "6706c75c841119000af57930",
            "name": "example",
            "email": "example@gmail.com",
            "role": "admin",
            "createdAt": "2024-10-09T18:11:40.043Z",
            "updatedAt": "2024-10-09T18:40:24.224Z",
            "__v": 0
        },
        "updatedBy": {
            "_id": "6706c75c841119000af57930",
            "name": "example",
            "email": "example@gmail.com",
            "role": "admin",
            "createdAt": "2024-10-09T18:11:40.043Z",
            "updatedAt": "2024-10-09T18:40:24.224Z",
            "__v": 0
        },
        "_id": "67087fd73bdd25cdb60385e3",
        "createdAt": "2024-10-11T01:31:03.882Z",
        "updatedAt": "2024-10-11T01:31:03.882Z",
        "__v": 0
    }
  }
  ```





- Class Schedule
   - POST `[ADMIN]` /class-schedule
   ```
   // request data
   {
    "title": "Morning 2",
    "day": "sunday",
    "maxTrainees": 10,
    "trainers": ["6707d4b10fc6149ae51ecded", "67077c602b3a46e7073b18d0"],
    "timeSlotId": "6707c7aa60076cef1683db7f"
  }

  // response data
  {
    "statusCode": 201,
    "success": true,
    "message": "Successfully Created",
    "data": {
        "title": "Morning 3",
        "day": "sunday",
        "maxTrainees": 10,
        "trainers": [
            {
                "_id": "67077c602b3a46e7073b18d0",
                "name": "example",
                "email": "example@gmail.com",
                "role": "trainer",
                "createdAt": "2024-10-10T07:04:00.657Z",
                "updatedAt": "2024-10-10T07:04:00.657Z",
                "__v": 0
            }
        ],
        "timeSlotId": "6707c7aa60076cef1683db7f",
        "duration": 2,
        "createdBy": {
            "_id": "6706c75c841119000af57930",
            "name": "example",
            "email": "example@gmail.com",
            "role": "admin",
            "createdAt": "2024-10-09T18:11:40.043Z",
            "updatedAt": "2024-10-09T18:40:24.224Z",
            "__v": 0
        },
        "updatedBy": {
            "_id": "6706c75c841119000af57930",
            "name": "example",
            "email": "example@gmail.com",
            "role": "admin",
            "createdAt": "2024-10-09T18:11:40.043Z",
            "updatedAt": "2024-10-09T18:40:24.224Z",
            "__v": 0
        },
        "_id": "670880f33bdd25cdb60385f3",
        "createdAt": "2024-10-11T01:35:47.826Z",
        "updatedAt": "2024-10-11T01:35:47.826Z",
        "__v": 0
    }
  }
   ```


- Booking
  - POST `[TRAINEE]` /booking
  ```
  // request data
  {
    "classScheduleId": "6707d4b10fc6149ae51ecded",
    "date": "2024-10-28"
  }

  // response data
  {
    "statusCode": 201,
    "success": true,
    "message": "Successfully Booked",
    "data": {
        "classScheduleId": {
            "_id": "6707d4b10fc6149ae51ecded",
            "title": "Morning 1",
            "day": "monday",
            "maxTrainees": 10,
            "trainers": [
                "67077c5a2b3a46e7073b18cd",
                "67077c602b3a46e7073b18d0"
            ],
            "timeSlotId": "6707c7aa60076cef1683db7f",
            "duration": 2,
            "createdBy": "6706c75c841119000af57930",
            "updatedBy": "6706c75c841119000af57930",
            "createdAt": "2024-10-10T13:20:49.099Z",
            "updatedAt": "2024-10-10T13:21:31.171Z",
            "__v": 0
        },
        "userId": {
            "_id": "67080f3d893d67117a0e458f",
            "name": "example",
            "email": "example@gmail.com",
            "role": "trainee",
            "createdAt": "2024-10-10T17:30:37.265Z",
            "updatedAt": "2024-10-10T17:30:37.265Z",
            "__v": 0
        },
        "date": "2024-10-28",
        "isCancel": false,
        "_id": "670881d43bdd25cdb60385fb",
        "createdAt": "2024-10-11T01:39:32.274Z",
        "updatedAt": "2024-10-11T01:39:32.274Z",
        "__v": 0
    }
}
  ```


### [ER Diagram Link](https://drive.google.com/file/d/14HRVRY1f443zaUQKPO0yJA5NM7DCHVwv/view?usp=sharing)

![Alt text](/ER-diagram.png)