# keen-congress-vote
Experiment using the Keen NodeJS api to import and then use the Keen workbench to analyze congressional vote data

I've been trying out [https://keen.io/](https://keen.io/) for some analytics and decided to try a little more challenging data. This time I am using congressional voting data that can be found off of [https://www.govtrack.us/congress/votes](https://www.govtrack.us/congress/votes)

To install and use this you can do the following.
The code already contains a json object that wil be uploaded to your Keen project.

* install NodeJS
* create your Keen account and a project
* export environment variables for your project info (these will be used by the code)
	* export projectId=xxx
	* export writeKey=xxx
	* export readKey=xxx
	* export masterKey=xxx
* git clone https://github.com/dougtoppin/keen-congress-vote.git
* npm install keen.io
* node keen-congress-vote/congress-vote.js

The data should have been uploaded to your Keen project.
The data set consists of an array of records, one for each person.

Next use the Keen workbench to take a look at your data.

* go to the Keen workbench for your project (called `congress-vote`)
* select the `Event Collection` called `congress-vote`
* select `Analysis Type` called `count_unique`
* select `Target Property` called `person_role.party`
* select `Run Query`

You should see the result of the query as `2` indicating that 2 values for party were found across the data set.

Numerous variations of queries can be run.




 



