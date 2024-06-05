//importing aws-sdk required to create cloudwatch instance
const AWS = require('aws-sdk');

/** This function deletes latency alarm and availability alarm
     Args
     url : The url whose alarms are to be deleted
     **/
export async function deleteAlarm(url:any) {
    const cw = new AWS.CloudWatch();
    var params = {
        AlarmNames: [`Url_AvailablityAlarm_${url}`,
        `Url_latencyAlarm_${url}`
    ]
      };
      
      cw.deleteAlarms(params, function(err:any, data:any) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });   
}