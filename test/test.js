import ClassifierUtils from '../src/utils/ClassifierUtils'
import TwitterUtils from '../src/utils/TwitterUtils'


async function test(){
    let screenName = process.env.SCREEN_NAME;
    let tweets = await TwitterUtils.getTweets(screenName);
    let filtered = TwitterUtils.filterOutRetweets(tweets);
    let foundTweet = filtered.find(async tweet => {
        let classification = await ClassifierUtils.classifyText(tweet.text);
        let foundCategory = classification.categories.find(category => category.label.indexOf("/news") != -1);
        let sentimentLabel = classification.sentiment.document.label;
        let matches = foundCategory != null && sentimentLabel === "negative";
        return matches;
    });
    console.log(foundTweet.text);
}

test();