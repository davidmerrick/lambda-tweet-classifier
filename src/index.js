import ClassifierUtils from '../src/utils/ClassifierUtils'
import TwitterUtils from '../src/utils/TwitterUtils'

var index = async (event, context, callback) => {
    let {category, sentimentLabel} = event;
    if(!category || !sentimentLabel){
        return callback(new Error("Please specify category and sentimentLabel"));
    }

    let screenName = event.screen_name || process.env.SCREEN_NAME;
    let tweets = await TwitterUtils.getTweets(screenName);
    let filteredTweets = TwitterUtils.filterOutRetweets(tweets);
    let foundTweet;
    for(var i = 0; i < filteredTweets.length; i++){
        let tweet = filteredTweets[i];
        let classification = await ClassifierUtils.classifyText(tweet.text);
        let foundCategory = classification.categories.find(item => item.label.indexOf(category) != -1);
        let document = classification.sentiment.document;
        let matches = foundCategory != null && document.label === sentimentLabel;
        if(matches){
            foundTweet = filteredTweets[i];
            break;
        }
    }
    callback(null, foundTweet);
}

exports.handler = index;