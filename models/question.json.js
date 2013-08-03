// question data type definition
var question =
{
    _id: '', // hex string
    body: '',
    author: '',
    author_id: '', // hex string
    created_at: new Date(),
    choice_type: '',
    choices: [
        {
            id: 0,
            body: '',
            count: 0
        }
    ],    
    tags: [
        ''
    ],
    thumb: '',
    views: 0,
    answered: 0,
    lastanswered_at: new Date(),
    comments:[
        {
            author: '',
            author_id: '', // hex string
            body: '',
            created_at: new Date()
        }
    ],
    results: [
        {
            author_id: '', // hex string
            choice_id: 0,
            created_at: new Date()
        }
    ],
    verion: 0
};