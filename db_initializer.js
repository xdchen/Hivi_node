// db initializer
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017/hivinate?w=1', function (err, db) {
    db.collection('questions', function (err, collection) {

        var questions = [{
            body: 'My wife just got home, Did she get me the Wendy\'s Frosty I wanted',
            author: 'suzieQ2345',
            author_id: new ObjectID(),
            created_at: new Date(),
            choice_type: 'Single',
            choices: [
                {
                    id: 1,
                    body: 'Yes'
                },
                {
                    id: 2,
                    body: 'No'
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
            ]
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
                        body: 'Yes'
                    },
                    {
                        id: 2,
                        body: 'No'
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
                ]
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
                        body: '100'
                    },
                    {
                        id: 2,
                        body: '50'
                    },
                    {
                        id: 3,
                        body: '20'
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
                ]
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
                        body: '10'
                    },
                    {
                        id: 2,
                        body: '15'
                    },
                    {
                        id: 3,
                        body: '25'
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
                ]
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
                        body: 'USA'
                    },
                    {
                        id: 2,
                        body: 'Canada'
                    },
                    {
                        id: 3,
                        body: 'Mexico'
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
                ]
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
                        body: 'Flicker'
                    },
                    {
                        id: 2,
                        body: 'Facebook'
                    },
                    {
                        id: 3,
                        body: 'Instagram'
                    },
                    {
                        id: 4,
                        body: 'Google+'
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
                ]
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
                        body: 'Say goodbye to all'
                    },
                    {
                        id: 2,
                        body: 'Send farewell email'
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
                ]
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
                          body: 'Stupid'
                      },
                      {
                          id: 2,
                          body: 'No reason'
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
                  ]
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
                           body: 'Yes'
                       },
                       {
                           id: 2,
                           body: 'No'
                       }
                   ],                   
                   tags: [
                       'website'
                   ],
                   thumb: '',
                   views: 1430,
                   answered: 623,
                   lastanswered_at: new Date(),
                   comments: [
                   ],
                   results: [
                   ]
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
                            body: 'strong willing to destroy the world'
                        },
                        {
                            id: 2,
                            body: 'to invade South Korea'
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
                    ]
                }
        ];

        collection.insert(questions, function (err, result) {
            db.close();
        });
    });
});