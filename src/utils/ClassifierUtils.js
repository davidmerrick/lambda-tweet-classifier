var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

class ClassifierUtils {

    static classifyText(text) {
        return new Promise((resolve, reject) => {
            var nlu = new NaturalLanguageUnderstandingV1({
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
                version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
            });

            var params = {
                html: text,
                'features': {
                    'sentiment': {},
                    'categories': {}
                }
            };

            nlu.analyze(params, (error, response) => {
                if(error){
                    return reject(error);
                }

                resolve(response);
            });
        });
    }
}

export default ClassifierUtils