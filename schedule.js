

const schedule = async (events, available, startdate ,revise_time) => {
    /*
    events:
    [
        {
            name: string
            deadline: date
            needtime: int
            seperate: int
        }
    ]

    available:
    [
        int,int,...,int (n=7)//1~7
    ]
    */
    const geteventsdata = (name,gettype)=>{
        for(let iii=0;iii<events.length;iii++){
            if(events[iii].name===name){
                if(gettype==="name")return events[iii].name;
                if(gettype==="deadline")return events[iii].deadline;
                if(gettype==="needtime")return events[iii].needtime;
                if(gettype==="seperate")return events[iii].seperate;
            }
        }
    }

    let firstdate = new Date(startdate);
    console.log(firstdate)
    //check max needtime
    let available_max = available.reduce(function(a, b) {return Math.max(a, b);})
    for(let i = 0;i<events.length;i++){
        if(events[i].needtime/events[i].seperate > available_max)return -1;
    }

    Seperate_events = [];
    events.map( (e)=>{
        for(let i=0 ; i<e.seperate ; i++){
            Seperate_events.push({ name:e.name, time:e.needtime/e.seperate })
        }
    })

    let n = Seperate_events.length;
    let used = Array.from(Array(events.length), ()=>0 );
    let possible_schedule = [];
    let solution = Array.from(Array(n), ()=>0 );
   
    const get_revise_time = (d) =>{
        let s = '';
        let dd = new Date(d);
        let temp = Object.keys(revise_time);
        for(let i=0;i<temp.length;i++){
            let temp2 = new Date(temp[i]);
            if(temp2.getDate()===dd.getDate() && 
            temp2.getMonth()===dd.getMonth() &&
            temp2.getFullYear()===dd.getFullYear()){
                return revise_time[temp[i]];
            }
        }
        return 0;

    }

    let possible_day_events = [];
    let available_event_num = 0;
    const is_schedule_exceed_deadline = (aschedule) => {
        let sday =  new Date(startdate);
        let j=0;
        let temp=0;
        //console.log(aschedule);
        let possible_day_event=[],dayevent=[];
        while(j<aschedule.length && j!==-1){
            temp+=geteventsdata(aschedule[j],"needtime")/geteventsdata(aschedule[j],"seperate")
            if(temp<=available[sday.getDay()]+get_revise_time(sday) && !dayevent.includes(aschedule[j]) ){
                let temp2 = geteventsdata(aschedule[j],"deadline")
                if(temp2.getTime()<sday.getTime()){return;}
                dayevent.push(aschedule[j]);
                j++;
                if(j===aschedule.length) possible_day_event.push({"date":new Date(sday),"events":Array.from(dayevent)});
            }else{
                possible_day_event.push({"date":new Date(sday),"events":Array.from(dayevent)});
                dayevent=[];
                sday.setDate(sday.getDate()+1);
                temp = 0;
            }
        }
        available_event_num++;
        possible_day_events.push(possible_day_event);
        return;
    }

    const permutation = (x) => {
        if(available_event_num>1) return;
        if( x === n ){
            let t = Array.from(Array(n), ()=>'' );
            solution.map((e,i)=>{t[i]=events[e].name});
            is_schedule_exceed_deadline(t);
        }else{
            for(let i=0;i<events.length;i++){
                if(used[i]<events[i].seperate){
                    used[i]++;
                    solution[x] = i;
                    permutation(x+1);
                    used[i]--;
                }
            }
        }
    }

    permutation(0)

    console.log(possible_schedule);
    console.log(available);

    //check deadline
    
    //optimize cost
    console.log('--------------------------------------------------------------------------------------------------------------------------------------------')
    let max_cost = 0,max_i=0;
    for(let i=0;i<possible_day_events.length;i++){
        //console.log(possible_day_events[i]);
        let eachcost=0;
        for(let j=0;j<possible_day_events[i].length;j++){
            for(let k=0;k<possible_day_events[i][j].events.length;k++){
                let temp = new Date(geteventsdata(possible_day_events[i][j].events[k],"deadline"));
                const diffTime = Math.abs(temp - possible_day_events[i][j].date);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                eachcost += diffDays;
            }
        }
        //console.log(`cost: ${eachcost}`);
        if(max_cost<eachcost){
            max_cost = eachcost;
            max_i = i;
        }
    }
    console.log(`credit : ${max_cost}`)
    console.log(possible_day_events[max_i]);
}
//test
let tempdate = new Date();

let tempdate1 = new Date();
tempdate1.setDate(tempdate.getDate()+10);
let d1 = new Date(tempdate1);
let tempdate2 = new Date();
tempdate2.setDate(tempdate.getDate()+2);
let d2 = new Date(tempdate2);
let tempdate3 = new Date();
tempdate3.setDate(tempdate.getDate()+30);
let d3 = new Date(tempdate3);

let tempdate4 = new Date();
tempdate4.setDate(tempdate.getDate()+5);
let d4 = new Date(tempdate4);
let tempdate5 = new Date();
tempdate5.setDate(tempdate.getDate()+7);
let d5 = new Date(tempdate5);
let tempdate6 = new Date();
tempdate6.setDate(tempdate.getDate()+3);
let d6 = new Date(tempdate6);

schedule(
    [
        {name:'a',needtime:12,seperate:3,deadline:d1},
        {name:'b',needtime:2,seperate:2,deadline:d2},
        //{name:'c',needtime:25,seperate:25,deadline:d3},
        {name:'d',needtime:3,seperate:1,deadline:d1},
        {name:'e',needtime:5,seperate:2,deadline:d2},
        {name:'f',needtime:18,seperate:3,deadline:d3},
        {name:'g',needtime:3,seperate:1,deadline:d1}
    ],
    [5,2,3,4,6,7,3],
    tempdate,
    {}
);


//export default schedule;