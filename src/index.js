import ClassifierUtils from '../src/utils/ClassifierUtils'
import TwitterUtils from '../src/utils/TwitterUtils'

exports.handler = async function index(event, context, callback){
    let screenName = event.screen_name || process.env.SCREEN_NAME;
    let tweets = await TwitterUtils.getTweets(screenName);
    let filteredTweets = TwitterUtils.filterOutRetweets(tweets);
    let foundTweet;
    for(var i = 0; i < filteredTweets.length; i++){
        let tweet = filteredTweets[i];
        let classification = await ClassifierUtils.classifyText(tweet.text);
        let foundCategory = classification.categories.find(category => category.label.indexOf(event.category) != -1);
        let sentimentLabel = classification.sentiment.document.label;
        let matches = foundCategory != null && sentimentLabel === event.sentimentLabel;
        if(matches){
            foundTweet = filteredTweets[i];
            break;
        }
    }
    callback(null, foundTweet);
}