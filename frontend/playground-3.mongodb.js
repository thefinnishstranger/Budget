// Select the database to use.
use('Budget');


db.Expenses.find({
  userId: ObjectId("676c4934394dae9f473a03a9"),
  date: { $gte: ISODate("2024-12-01"), $lte: ISODate("2024-12-31") },
});

