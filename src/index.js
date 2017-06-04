var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

exports.handler = function index(event, context, callback){
    const nlu = new NaturalLanguageUnderstandingV1({
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
    });


    let params = {
        html: event.html,
        'features': {
            'sentiment': {},
            'categories': {}
        }
    };

    nlu.analyze(params, (error, response) => {
        if(error){
            return callback(error);
        }

        return callback(null, response);
    });
}