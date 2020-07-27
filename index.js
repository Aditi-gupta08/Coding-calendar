const axios = require('axios');
const {to} = require('await-to-js');
const yargs = require('yargs');

async function func1()
{   let data = [];

    let [err, res] = await to(axios.get('https://clist.by/get/events/'));

    if(err)
    {
        console.log("Error: ", err);
    }
    
    return res.data;
}


async function main()
{
    let Contests = await to(func1());
    let allContests = Contests[1];

    let cur = new Date();
    let past_contests = [], cur_contests = [], upc_contests = [];


    for(let i=0; i<allContests.length; i++)
    {
        t1 = allContests[i]["start"];
        t1 = new Date(t1);

        t2 = allContests[i]["end"];
        t2 = new Date(t2);

        if( t2<cur )
            past_contests.push( allContests[i] );
        else if( cur<=t1 )
            upc_contests.push( allContests[i] );
        else
            cur_contests.push( allContests[i] );
    }
    
    console.log("\n");


    yargs.version('1.1.0');

    yargs.command({
        command: 'past',
        describe: 'Contests which have finished',
        handler: function(){
            console.log("#### PAST CONTESTS ####");
            console.log( "No of contests : ",  past_contests.length, "\n\n");
            console.log( past_contests );
        }
    })

    yargs.command({
        command: 'running',
        describe: 'Currently runing contest',
        handler: function(){
            console.log("#### RUNNING CONTESTS ####");
            console.log( "No of contests : ",  cur_contests.length, "\n\n");
            console.log( cur_contests );
        }
    })

    yargs.command({
        command: 'upcoming',
        describe: 'Upcoming contests',
        handler: function(){
            console.log( "######## UPCOMING CONTESTS ########");
            console.log( "No of contests : ",  upc_contests.length, "\n\n");
            console.log( upc_contests );
        }
    })

    yargs.command({
        command: 'all',
        describe: 'All contests',
        handler: function(){
            console.log("######## ALL CONTESTS ########");
            console.log( "No of contests : ", allContests.length, "\n\n");
            console.log( allContests );
        }
    })

    yargs.argv;
    console.log("\n");
}

main();

