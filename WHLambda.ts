//importing packages
const axios = require("axios");
import * as constants from "./constants"
import { CloudWatchPublishData } from "./CloudWatchPublishData"
const {dbGet} = require('./mongodb_facade');

// handler function to process events whenever function is invoked

exports.lambda_handler = async function (event: any) {
    // getting URLs from MongoDB to be looped upon
    let urls = await dbGet();
    var result=[]
    let avail;
    let latency;
    let cloudwatch= new CloudWatchPublishData();
    // looping through the list of URLs
    for(let i=0;i<urls.length;i++){
        //getting availability and latency
        avail=await getAvailability(urls[i].url);
        latency=await getLatency(urls[i].url);
        result.push({
            "url:": urls[i].url,
            "Availibality":avail,
            "Latency":latency 
        });
        let dimensions=[
            {'Name':'URL','Value':urls[i].url}
        ]
        // pasing data to publish metrics to cloudwatch
       cloudwatch.publish_data(constants.METRICNAME_LATENCY,dimensions,latency,constants.METRIC_NAMESPACE);
       cloudwatch.publish_data(constants.METRICNAME_AVAILABLITY,dimensions,avail,constants.METRIC_NAMESPACE);

       //passing data to the functions which create alarms
       cloudwatch.create_latency_alarm(constants.METRICNAME_LATENCY,urls[i].url);
       cloudwatch.create_availability_alarm(constants.METRICNAME_AVAILABLITY,urls[i].url);
      
    }    
     
    return result;

};

/** function to get the latency of URL
 Args
  url: string of URL
  return the delay time required by URL
 **/
async function getLatency(url: string) {
    let startTime = new Date().getTime();
    let response = await axios.get(url);
    let endTime = new Date().getTime();
    let delta = endTime - startTime;
    return delta;

}
/** function to get the availablity of URL
 Args
  url: string of URL
  return 1 if web resource is accessible otherwise 0
 **/
async function getAvailability(url: string) {
    let res = await axios.get(url);
    if (res.status == 200)
        return 1.0;
    return 0.0;
}