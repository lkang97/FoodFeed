#FoodFeed Schema

## **users**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| username       |  string   |      not null, unique |
| email          |  string   |      not null, unique |
| profileName    |  string   |              optional |
| imageUrl       |  string   |              not null |
| biography      |   text    |              optional |
| hashedPassword |  string   |     not null (binary) |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **posts**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  | not null, foreign key |
| imageUrl       |  string   |              not null |
| caption        |   text    |              not null |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **comments**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  | not null, foreign key |
| postId         |  integer  | not null, foreign key |
| comment        |   text    |              not null |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |

## **likes**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| userId         |  integer  | not null, foreign key |
| postId         |  integer  | not null, foreign key |
| createdAt      | timestamp |              not null |
| updatedAt      | timestamp |              not null |
