import ClassifierUtils from '../src/utils/ClassifierUtils'
import TwitterUtils from '../src/utils/TwitterUtils'

async function test(){
    let screenName = process.env.SCREEN_NAME;
    let tweets = await TwitterUtils.getTweets(screenName);
    let filteredTweets = TwitterUtils.filterOutRetweets(tweets);
    let foundTweet;
    for(var i = 0; i < filteredTweets.length; i++){
        let tweet = filteredTweets[i];
        let classification = await ClassifierUtils.classifyText(tweet.text);
        let foundCategory = classification.categories.find(category => category.label.indexOf("/news") != -1);
        let sentimentLabel = classification.sentiment.document.label;
        let matches = foundCategory != null && sentimentLabel === "negative";
        if(matches){
            foundTweet = filteredTweets[i];
            break;
        }
    }
    console.log(foundTweet.text);
}

test();