//TODO: make version for each spew tables needed
function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      full_name: "Test user 1",
      nickname: "TU1",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      user_name: "test-user-2",
      full_name: "Test user 2",
      nickname: "TU2",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 3,
      user_name: "test-user-3",
      full_name: "Test user 3",
      nickname: "TU3",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 4,
      user_name: "test-user-4",
      full_name: "Test user 4",
      nickname: "TU4",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];
}

//TODO: make work with spew's tables
function makeExpectedArticle(users, article, comments = []) {
  const author = users.find(user => user.id === article.author_id);

  const number_of_comments = comments.filter(
    comment => comment.article_id === article.id
  ).length;

  return {
    id: article.id,
    style: article.style,
    title: article.title,
    content: article.content,
    date_created: article.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  };
}

//TODO: make work with spew's tables
function makeArticlesFixtures() {
  const testUsers = makeUsersArray();
  const testArticles = makeArticlesArray(testUsers);
  const testComments = makeCommentsArray(testUsers, testArticles);
  return {testUsers, testArticles, testComments};
}

//TODO: make work with spew's tables
function cleanTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
        `TRUNCATE
        blogful_articles,
        blogful_users,
        blogful_comments
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(
            `ALTER SEQUENCE blogful_articles_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE blogful_users_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(
            `ALTER SEQUENCE blogful_comments_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('blogful_articles_id_seq', 0)`),
          trx.raw(`SELECT setval('blogful_users_id_seq', 0)`),
          trx.raw(`SELECT setval('blogful_comments_id_seq', 0)`),
        ])
      )
  );
}

//TODO: make work with spew's tables
function seedArticlesTables(db, users, articles, comments = []) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await trx.into("blogful_users").insert(users);
    await trx.into("blogful_articles").insert(articles);
    // update the auto sequence to match the forced id values
    await Promise.all([
      trx.raw(`SELECT setval('blogful_users_id_seq', ?)`, [
        users[users.length - 1].id,
      ]),
      trx.raw(`SELECT setval('blogful_articles_id_seq', ?)`, [
        articles[articles.length - 1].id,
      ]),
    ]);
    // only insert comments if there are some, also update the sequence counter
    if (comments.length) {
      await trx.into("blogful_comments").insert(comments);
      await trx.raw(`SELECT setval('blogful_comments_id_seq', ?)`, [
        comments[comments.length - 1].id,
      ]);
    }
  });
}