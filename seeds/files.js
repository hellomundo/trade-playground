
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('files').del()
    .then(function () {
      // Inserts seed entries
      return knex('files').insert([
        {id: 1, date: '2021-02-01', file_name: 'spy-2021-02-01.csv', file_size: 4534265, rows: 450 },
        {id: 2, date: '2021-02-02', file_name: 'spy-2021-02-02.csv', file_size: 3134211, rows: 457 },
        {id: 3, date: '2021-02-03', file_name: 'spy-2021-02-03.csv', file_size: 4034267, rows: 451 }
      ]);
    });
};
