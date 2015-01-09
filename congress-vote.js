/**
 * Created by dougtoppin on 1/7/15.
 */


/*
 Upload vote data from govtrack.us to a Keen.io project

 This data is downloaded from the congressional vote object at https://www.govtrack.us/api/v2/vote_voter?vote=

 Usage: node keen-congress-vote/congress-vote.js 116119

 If you enter a voteId that does not exist this will output the following and exit with a status of 1

 error, no data found using voteId 234234234

 */


var https = require('https');
var Keen = require('keen.io');

if (process.argv[2] == null) {
    console.log("Usage: " + process.argv[0] + " voteId");
    process.exit(1);
}
var voteId = process.argv[2];


var options = {
    hostname: 'www.govtrack.us',
    port: 443,
    path: '/api/v2/vote_voter?vote=' + voteId,
    method: 'GET'
};

/*
 configuration uses the environment variables set to your Keen values
 */

var client = Keen.configure({
    projectId: process.env.projectId,
    writeKey: process.env.writeKey,
    readKey: process.env.readKey,
    masterKey: process.env.masterKey
})


var dataset = '';

var voteObj;


var req = https.request(options, function (res) {
    //console.log("statusCode: ", res.statusCode);
    //console.log("headers: ", res.headers);

    res.on('data', function (d) {
        dataset += d;
        //process.stdout.write(d);
    });

    res.on('end', function () {
        //console.log("dataset" + dataset);

        voteObj = JSON.parse(dataset);

        if (voteObj.meta.total_count == 0) {
            console.log("error, no data found using voteId " + voteId);
            process.exit(1);
        }
        // now upload each object in the response to a collection specific to this vote
        voteObj.objects.forEach(function (value) {
            //console.log("object:" + value.person.lastname);

            client.addEvent("congress-vote-" + voteId, value, function (err, res) {
                if (err) {
                    console.log("err:" + value.person.name + ", " + err);
                } else {
                    console.log("upload:" + value.person.name);
                }
            })

        })
        console.log("uploaded object count: " + voteObj.meta.total_count);

    });
});
req.end();

req.on('error', function (e) {
    console.error(e);
});






