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
