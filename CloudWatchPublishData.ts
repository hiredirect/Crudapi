//importing aws-sdk required to create cloudwatch instance
const AWS = require('aws-sdk');

//publish data to cloudwatch using sdk
export class CloudWatchPublishData {

    /** This function publishes data to cloudwatch
     Args
     metricName: string of metric name
     dimensions: array of object conatining url and its name
     value: number as value of metric 
     namespace string of namespace name
     **/
    publish_data(metricName: string, dimensions: any, value: number, namespace: string) {
        const cw = new AWS.CloudWatch();
        
        cw.putMetricData(
            {
                MetricData: [
                    {
                        MetricName: metricName,
                        Dimensions: dimensions,
                        Value: value,
                    }],
                Namespace: namespace
            },
            function (err: any, data: any) {
                if (err) console.log(err, err.stack); // an error occurred
                else console.log(data);           // successful response
            }
        )
    }
    /** This function creates latency alarm
     Args
     metricName: string of metric name
     dimensions: array of object conatining url and its name
     url : The url to be created an alarm for
     **/
    create_latency_alarm(metricName: string, url:string){
        const cw = new AWS.CloudWatch();

        var params = {
            AlarmName: `AH${metricName}Alarm_${url}`,
            ComparisonOperator:"GreaterThanThreshold" ,
            EvaluationPeriods: 1,
            MetricName: metricName,
            Threshold: 200,
            Namespace: 'URL-Namespace',
            ActionsEnabled: false,
            Period: 60,
            Statistic: 'Average',
            Unit: "Milliseconds"
        };
        cw.putMetricAlarm(params, function(err:any, data:any) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(params);           // successful response
        });
    }
    /** This function creates availability alarm
     Args
     metricName: string of metric name
     dimensions: array of object conatining url and its name
     url : The url to be created an alarm for
     **/
    create_availability_alarm(metricName: string, url:string){
        const cw = new AWS.CloudWatch();

        var params = {
            AlarmName: `AH${metricName}Alarm_${url}`,
            ComparisonOperator:"LessThanThreshold" ,
            EvaluationPeriods: 1,
            MetricName: metricName,
            ActionsEnabled: false,
            Threshold: 1,
            Namespace: 'URL-Namespace',
            Period: 60,
            Statistic: 'Average',
        };
        cw.putMetricAlarm(params, function(err:any, data:any) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(params);           // successful response
        });
    }

}