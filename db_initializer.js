// db initializer
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var config = require('./config');
var connection_str = 'mongodb://' + config.db.server + ':' + config.db.port + '/' + config.db.name + '?w=1';

MongoClient.connect(connection_str, function (err, db) {
    db.collection('questions', function (err, collection) {

        // insert some dummy questions
        var questions = [{
            body: 'My wife just got home, Did she get me the Wendy\'s Frosty I wanted',
            author: 'suzieQ2345',
            author_id: new ObjectID(),
            created_at: new Date(),
            choice_type: 'Single',
            choices: [
                {
                    id: 1,
                    body: 'Yes',
                    count: 0
                },
                {
                    id: 2,
                    body: 'No',
                    count: 0
                }
            ],            
            tags: [
                'wife', 'frost'
            ],
            thumb: '',
            views: 0,
            answered: 0,
            lastanswered_at: new Date(),
            comments: [
            ],
            results: [
            ],
            version: 0
        },
            {
                body: 'Are the best things in life free',
                author: 'randomUser45',
                author_id: new ObjectID(),
                created_at: new Date(),
                choice_type: 'Single',
                choices: [
                    {
                        id: 1,
                        body: 'Yes',
                        count: 0
                    },
                    {
                        id: 2,
                        body: 'No',
                        count: 0
                    }
                ],
                
                tags: [
                    'life', 'free'
                ],
                thumb: '',
                views: 0,
                answered: 0,
                lastanswered_at: new Date(),
                comments: [
                ],
                results: [
                ],
                version: 0
            },

            {
                body: 'How much wood could a woodchuk chuck if a woodchuck...?',
                author: 'billy.ipsum23',
                author_id: new ObjectID(),
                created_at: new Date(),
                choice_type: 'Single',
                choices: [
                    {
                        id: 1,
                        body: '100',
                        count: 0
                    },
                    {
                        id: 2,
                        body: '50',
                        count: 0
                    },
                    {
                        id: 3,
                        body: '20',
                        count: 0
                    }

                ],                
                tags: [
                    'wood', 'chuck'
                ],
                thumb: '',
                views: 0,
                answered: 0,
                lastanswered_at: new Date(),
                comments: [
                ],
                results: [
                ],
                version: 0
            },

            {
                body: 'When in doubt what do you do?',
                author: 'JunkieMonkey45',
                author_id: new ObjectID(),
                created_at: new Date(),
                choice_type: 'Single',
                choices: [
                    {
                        id: 1,
                        body: '10',
                        count: 0
                    },
                    {
                        id: 2,
                        body: '15',
                        count: 0
                    },
                    {
                        id: 3,
                        body: '25',
                        count: 0
                    }
                ],
                
                tags: [
                    'doubt'
                ],
                thumb: '',
                views: 0,
                answered: 0,
                lastanswered_at: new Date(),
                comments: [
                ],
                results: [
                ],
                version: 0
            },

            {
                body: 'Where in the world is Carmen San Diego?',
                author: 'lpsum35Fan',
                author_id: new ObjectID(),
                created_at: new Date(),
                choice_type: 'Single',
                choices: [
                    {
                        id: 1,
                        body: 'USA',
                        count: 0
                    },
                    {
                        id: 2,
                        body: 'Canada',
                        count: 0
                    },
                    {
                        id: 3,
                        body: 'Mexico',
                        count: 0
                    }
                ],                
                tags: [
                    'Carmen San Diego'
                ],
                thumb:'',
                views: 0,
                answered: 0,
                lastanswered_at: new Date(),
                comments: [
                ],
                results: [
                ],
                version: 0
            },

            {
                body: 'What is the best free image hosting site?',
                author: 'silceneisGolden',
                author_id: new ObjectID(),
                created_at: new Date(),
                choice_type: 'Single',
                choices: [
                    {
                        id: 1,
                        body: 'Flicker',
                        count: 0
                    },
                    {
                        id: 2,
                        body: 'Facebook',
                        count: 0
                    },
                    {
                        id: 3,
                        body: 'Instagram'
                    },
                    {
                        id: 4,
                        body: 'Google',
                        count: 0
                    }
                ],                
                tags: [
                    'image', 'hosting'
                ],
                thumb: '',
                views: 0,
                answered: 0,
                lastanswered_at: new Date(),
                comments: [
                ],
                results: [
                ],
                version: 0
            },

            {
                body: 'Best way to leave a job without burning bridges?',
                author: 'JIpsumGuy456',
                author_id: new ObjectID(),
                created_at: new Date(),
                choice_type: 'Single',
                choices: [
                    {
                        id: 1,
                        body: 'Say goodbye to all',
                        count: 0
                    },
                    {
                        id: 2,
                        body: 'Send farewell email',
                        count: 0
                    }
                ],
                tags: [
                    'job', 'leaving'
                ],
                thumb: '',
                views: 0,
                answered: 0,
                lastanswered_at: new Date(),
                comments: [
                ],
                results: [
                ],
                version: 0
            },
            {
                body: 'How many years before North Korea snpas and bombs everything?',
                author: 'Whodoneit32',
                author_id: new ObjectID(),
                created_at: new Date(),
                choice_type: 'Single',
                choices: [
                    {
                        id: 1,
                        body: 'never',
                        count: 440
                    },
                    {
                        id: 2,
                        body: '5 years',
                        count: 310
                    },
                    {
                        id: 3,
                        body: '10 years',
                        count: 450
                    },
                    {
                        id: 4,
                        body: '15 years',
                        count: 300
                    },
                    {
                        id: 5,
                        body: '20+ years',
                        count: 100
                    }
                ],
                tags: [
                    'haters'
                ],
                thumb: '',
                views: 2000,
                answered: 1600,
                lastanswered_at: new Date(),
                comments: [
                ],
                results: [
                ],
                version: 0
            },
              {
                  body: 'Why are haters going to hate?',
                  author: 'JIpsumGuy456',
                  author_id: new ObjectID(),
                  created_at: new Date(),
                  choice_type: 'Single',
                  choices: [
                      {
                          id: 1,
                          body: 'Stupid',
                          count: 440
                      },
                      {
                          id: 2,
                          body: 'No reason',
                          count: 310
                      }
                  ],
                  tags: [
                      'haters'
                  ],
                  thumb: '',
                  views: 2000,
                  answered: 750,
                  lastanswered_at: new Date(),
                  comments: [
                  ],
                  results: [
                  ],
                  version: 0
              },

               {
                   body: 'Does this site even work as well as we think it does?',
                   author: 'JIpsumGuy456',
                   author_id: new ObjectID(),
                   created_at: new Date(),
                   choice_type: 'Single',
                   choices: [
                       {
                           id: 1,
                           body: 'Yes',
                           count: 463
                       },
                       {
                           id: 2,
                           body: 'No',
                           count: 260
                       }
                   ],                   
                   tags: [
                       'website'
                   ],
                   thumb: '',
                   views: 1430,
                   answered: 723,
                   lastanswered_at: new Date(),
                   comments: [
                   ],
                   results: [
                   ],
                   version: 0
               },

                {
                    body: 'What is North Korea even trying to prove?',
                    author: 'JIpsumGuy456',
                    author_id: new ObjectID(),
                    created_at: new Date(),
                    choice_type: 'Single',
                    choices: [
                        {
                            id: 1,
                            body: 'strong willing to destroy the world',
                            count: 450
                        },
                        {
                            id: 2,
                            body: 'to invade South Korea',
                            count: 300
                        }
                    ],
                    tags: [
                        'politic', 'war', 'Korea'
                    ],
                    thumb: '',
                    views: 1500,
                    answered: 750,
                    lastanswered_at: new Date(),
                    comments: [
                    ],
                    results: [
                    ],
                    version: 0
                }
        ];

        collection.insert(questions, function (err, result) {
            db.close();
        });

        // insert more -- to do


    });
});