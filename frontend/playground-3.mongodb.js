// Select the database to use.
use('Budget');

// Insert a few documents into the Account collection.
db.getCollection('Account').insertMany([
  {
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    passwordHash: '$2b$10$wH4k6uMBTShOU3Rc/dkEpuT01POg69MD9X1JadAWhBiRMJdALH7Zm', // Hash of 'password123'
  },
  {
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob@example.com',
    passwordHash: '$2b$10$3K/Xz/Hi3oLPYvPeKKmdje5vG7umJnNOm57Ml61rgGIKcFvjR/SG2', // Hash of 'password456'
  },
  {
    firstName: 'Charlie',
    lastName: 'Johnson',
    email: 'charlie@example.com',
    passwordHash: '$2b$10$EkQ2m02OmMlrG6tKlRsEKeot05BxR5CGdRc9eP/9kHLyzCb6Kk.aK', // Hash of 'mypassword'
  },
]);
