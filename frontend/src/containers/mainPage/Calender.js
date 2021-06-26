import { ResponsiveBar } from '@nivo/bar'
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';
import CalenderDrawer from '../../Components/CalenderDrawer';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CalenderDate from '../../Components/CalenderDates'
import CalenderPopUpWindow from '../../Components/CalenderPopUpWindow'
const useStyles = makeStyles({
    root: {
        display: 'flex',
      },
    calender: {
      height:'52vh'
    },
    drawer: {
      '& .MuiDrawer-paper':{
        height: 200
    },
    card: {
        minWidth: 275,
        display: 'block',
        // width: '30vw',
        transitionDuration: '0.3s',
        height: 'auto',
        background:"blue"
    },
    date: {
      textAlign: 'center',
    },
    arrow: {
      fontSize: 40,
    }
    }
  });

const data = [
    {
      "day": "Sun",
      "country": "AD",
      "hot dog": 31,
      "hot dogColor": "hsl(139, 70%, 50%)",
      "burger": 110,
      "burgerColor": "hsl(249, 70%, 50%)",
      "sandwich": 143,
      "sandwichColor": "hsl(163, 70%, 50%)",
      "kebab": 53,
      "kebabColor": "hsl(5, 70%, 50%)",
      "fries": 4,
      "friesColor": "hsl(88, 70%, 50%)",
      "donut": 0,
      "donutColor": "hsl(3, 70%, 50%)"
    },
    {
      "day": "Mon",
      "country": "AE",
      "hot dog": 169,
      "hot dogColor": "hsl(63, 70%, 50%)",
      "burger": 13,
      "burgerColor": "hsl(266, 70%, 50%)",
      "sandwich": 11,
      "sandwichColor": "hsl(312, 70%, 50%)",
      "kebab": 128,
      "kebabColor": "hsl(319, 70%, 50%)",
      "fries": 45,
      "friesColor": "hsl(29, 70%, 50%)",
      "donut": 19,
      "donutColor": "hsl(292, 70%, 50%)"
    },
    {
      "day": "Two",
      "country": "AF",
      "hot dog": 95,
      "hot dogColor": "hsl(87, 70%, 50%)",
      "burger": 7,
      "burgerColor": "hsl(75, 70%, 50%)",
      "sandwich": 29,
      "sandwichColor": "hsl(135, 70%, 50%)",
      "kebab": 194,
      "kebabColor": "hsl(305, 70%, 50%)",
      "fries": 55,
      "friesColor": "hsl(59, 70%, 50%)",
      "donut": 86,
      "donutColor": "hsl(294, 70%, 50%)"
    },
    {
      "day": "Wed",
      "country": "AG",
      "hot dog": 156,
      "hot dogColor": "hsl(1, 70%, 50%)",
      "burger": 7,
      "burgerColor": "hsl(112, 70%, 50%)",
      "sandwich": 113,
      "sandwichColor": "hsl(346, 70%, 50%)",
      "kebab": 2,
      "kebabColor": "hsl(51, 70%, 50%)",
      "fries": 98,
      "friesColor": "hsl(82, 70%, 50%)",
      "donut": 52,
      "donutColor": "hsl(116, 70%, 50%)"
    },
    {
      "day": "Thu",
      "country": "AI",
      "hot dog": 150,
      "hot dogColor": "hsl(244, 70%, 50%)",
      "burger": 140,
      "burgerColor": "hsl(60, 70%, 50%)",
      "sandwich": 65,
      "sandwichColor": "hsl(16, 70%, 50%)",
      "kebab": 17,
      "kebabColor": "hsl(201, 70%, 50%)",
      "fries": 143,
      "friesColor": "hsl(20, 70%, 50%)",
      "donut": 68,
      "donutColor": "hsl(308, 70%, 50%)"
    },
    {
      "day": "Fri",
      "country": "AL",
      "hot dog": 134,
      "hot dogColor": "hsl(92, 70%, 50%)",
      "burger": 113,
      "burgerColor": "hsl(167, 70%, 50%)",
      "sandwich": 34,
      "sandwichColor": "hsl(332, 70%, 50%)",
      "kebab": 61,
      "kebabColor": "hsl(67, 70%, 50%)",
      "fries": 187,
      "friesColor": "hsl(236, 70%, 50%)",
      "donut": 40,
      "donutColor": "hsl(126, 70%, 50%)"
    },
    {
      "day": "Sat",
      "country": "AM",
      "hot dog": 133,
      "hot dogColor": "hsl(312, 70%, 50%)",
      "burger": 108,
      "burgerColor": "hsl(99, 70%, 50%)",
      "sandwich": 37,
      "sandwichColor": "hsl(296, 70%, 50%)",
      "kebab": 50,
      "kebabColor": "hsl(273, 70%, 50%)",
      "fries": 33,
      "friesColor": "hsl(347, 70%, 50%)",
      "donut": 159,
      "donutColor": "hsl(90, 70%, 50%)"
    }
  ]

const weekDay = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
]

const handleChange = (func, event) => {
  func(event.target.value);
};

const makeColor=()=>{
  const specifiers = "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"
  var n = specifiers.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifiers.slice(i * 6, ++i * 6);
  return colors;
}


// const MyResponsiveBar = () => (
function MyResponsiveBar({scheduledList, setScheduledList, schedule, setSchedule, day, setDay, setMyAnimation,setDisplayStatus}) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerContent, setDrawerContent] = useState('')
    const [week, setWeek] = useState(0)
    const colorList = makeColor();
    const CompletedColor = '#f44336'

    // transform schedule to task for calender
    const scheduleToTask = () => {
      const todoEvents = {} // 把事件和對應的時間包成物件
      scheduledList.forEach(({name, separate, needtime}) => {
        todoEvents[name] = needtime/separate
        console.log(todoEvents)
      })
      if (schedule.length === 0) {
        return day.map((value, i) => (
          {
            day: weekDay[i],
            empty: value,
            emptyColor: colorList[0],
            totalTime: value,
          }
        ))
      }
      const firstDate = new Date(schedule[0].date)
      firstDate.setDate(firstDate.getDate()-1)
      const today = new Date()
      let tempDate = new Date(today)
      console.log(tempDate)
      // const week = week
      let weekSchedule = [] // 將設定星期的schedule取出

      // 檢查設定的星期的第一天是否在 schedule 的第一天之前
      // 如果是，則取出的 weekSchedule 會小於7天
      if (tempDate.setDate(today.getDate()-today.getDay() + week*7) < firstDate) {
        // 檢查設定的星期的最後一天是否在 schedule 的第一天之後
        if (tempDate.setDate(tempDate.getDate() + 6) >= firstDate) {
          // console.log(firstDate)
          console.log("schedule", schedule)
          weekSchedule = schedule.slice(0, tempDate.getDay() - firstDate.getDay() + 1)
        }  
        else {
          weekSchedule = [];
        }
      }
      else {
        console.log(tempDate)
        const i = Math.round((tempDate.setHours(0) - firstDate)/(1000*60*60*24))
        console.log(firstDate)
        console.log(i)
        console.log("schedule", schedule)
        weekSchedule = schedule.slice(i, i+7)
      }
      const length = weekSchedule.length
      console.log(weekSchedule)
      // 根據 weekSchedule 將每天的事件放入
      const newTask = day.map(( value, i ) => {
        let tempEvents = {
          day: weekDay[i],
          empty: value,
          emptyColor: colorList[0],
          totalTime: value
        }
        if (i===0) {
          scheduledList.forEach(({name},i) => {
            tempEvents[name] = 0;
            tempEvents[name+'Color'] = colorList[i+1];
          })
        }
        let index = i
        let tempToday = new Date()
        if (week === 0) {
          index = i - tempToday.getDay()
        }
        else {
          if (length !== 7) {
            index = (i < length)? i : -1
          }
        }
        if (index >= 0 && index < length) {
          let eventsTime = 0;
          console.log(index)
          weekSchedule[index].events.forEach(({name, completed}) => {
            tempEvents[name] = todoEvents[name]
            if (completed) {
              tempEvents[name + 'Color'] = CompletedColor
            }
            else {
              tempEvents[name + 'Color'] = colorList[scheduledList.findIndex((value)=> (value.name === name))+1]
            }
            
            console.log(todoEvents[name])
            if (todoEvents[name]) {
              eventsTime += todoEvents[name]
            }
          })
          
          console.log(eventsTime, value)
          tempEvents.empty = tempEvents.totalTime - eventsTime
        }
        // 篩選這星期的schedule
        // if (i > today.getDay()-1) {
        //   const index = i-today.getDay()+1
        //   if (index < schedule.length) {
        //     let eventsTime = 0
        //     schedule[index].events.forEach((value) => {
        //       tempEvents[value] = todoEvents[value]
        //       eventsTime += todoEvents[value]
        //     })
        //     tempEvents.empty = tempEvents.totalTime - eventsTime
        //   }
        // }
        // console.log(tempEvents)
        return tempEvents
      })
      console.log(newTask)
      return newTask;
     }

    const [task, setTask] = useState([])

    const handleClick = (data) => {
        setDrawerContent(data)
        setDrawerOpen(true)
        setMyAnimation("flair")
        console.log(data)
    }

    const changeDay = (i, event) => {
      const newTask = [...task]
      newTask[i].empty += event.target.value - newTask[i].totalTime
      newTask[i].totalTime = event.target.value
      setTask(newTask)
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDrawerOpen(open);
        setDrawerContent('')
      };

    useEffect(() => {
      console.log('effect')
      setTask(scheduleToTask())
    }, [scheduledList, week])

    
    // useEffect(()=>{
    //   const specifiers = "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"
    //   const colorList = makeColor(specifiers)
    //   setColorList(colorList)
    // },[])

    return (
        <>
        <CalenderDate week={week} setWeek={setWeek}/>
        <div className={classes.calender}>
          <ResponsiveBar
              // data={data}
              data={task}
              // keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
              // keys={['test']}
              keys={['empty', ...scheduledList.map((value)=>(value.name))]}
              indexBy="day"
              margin={{ top: 20, right: 130, bottom: 20, left: 60 }}
              padding={0.3}
              // reverse={true}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              minValue={0}
              maxValue={10}
              // colors={{ scheme: 'set3' }}
              colors={({ id, data }) => data[`${id}Color`]}
              defs={[
                  {
                      id: 'dots',
                      type: 'patternDots',
                      background: 'inherit',
                      color: '#38bcb2',
                      size: 4,
                      padding: 1,
                      stagger: true
                  },
                  {
                      id: 'lines',
                      type: 'patternLines',
                      background: 'inherit',
                      color: '#eed312',
                      rotation: -45,
                      lineWidth: 6,
                      spacing: 10
                  }
              ]}
              fill={[
                  // {
                  //     match: {
                  //         id: 'fries'
                  //     },
                  //     id: 'dots'
                  // },
                  // {
                  //     match: {
                  //         id: 'sandwich'
                  //     },
                  //     id: 'lines'
                  // }
              ]}
              borderRadius={6}
              borderWidth={2}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', '3' ] ] }}
              axisTop={{
                  tickSize: 0,
                  tickPadding: 5,
                  tickRotation: 0,
                  legendPosition: 'middle',
                  legendOffset: 32,
              }}
              axisRight={null}
              axisBottom={null}
              axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Hour',
                  legendPosition: 'middle',
                  legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              legends={[
                  {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [
                          {
                              on: 'hover',
                              style: {
                                  itemOpacity: 1
                              }
                          }
                      ]
                  }
              ]}
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              // reverse
              theme={{
                  // fontSize: 20,
                  axis: {
                      ticks: {
                          text: {
                              fontSize: 20,
                          },      
                  },
                  
              }}}
              onClick={handleClick}
          />
        </div>
        <Grid container justify='space-around'>
          <Grid item xs={1} style={{minWidth: 60}}/>
          {weekDay.map((value, i) => (
            <Grid item xs={1} key={`day${value}`}>
              <TextField
                  id="outlined-number"
                  inputProps={{style: { textAlign: 'center' }}} 
                  label={value}
                  value={day[i]}
                  onChange={(e) => {
                      // handleChange(setDay[i], e)
                      let err = false;
                      if(parseInt(e.target.value)>10 || parseInt(e.target.value)<0){
                        setDisplayStatus('warning','The available time should be between 0 and 10.')
                        err = true;
                      }else {
                        const gettime = (name) =>{
                          for(let ii=0;ii<scheduledList.length;ii++){
                            if(name===scheduledList[ii].name) return parseInt(scheduledList[ii].needtime,10)/parseInt(scheduledList[ii].separate,10)
                          }
                        }
                        for(let ii=0;ii<schedule.length;ii++){
                          let tempdate = new Date(schedule[ii].date)
                          console.log(tempdate )
                          console.log(schedule[ii])
                          let weekday = tempdate.getDay()
                          console.log(weekday)
                          if(weekday===(i+1)%7)
                          {
                            console.log(tempdate.getDay())
                            let totaltime = 0;
                            for(let j=0;j<schedule[ii].events.length;j++){
                              totaltime += gettime(schedule[ii].events[j].name)
                            }
                            if(totaltime>parseInt(e.target.value)) {
                              setDisplayStatus('warning','The available time should be greater than your scheduled periods.')
                              err = true;
                            }                            
                          }                         
                        }
                      }
                      if(!err){
                        setDay[i](parseInt(e.target.value))
                        changeDay(i, e)
                      }
                    }  
                  }
                  type="number"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  variant="outlined"
                  fullWidth
              />
          </Grid>
          ))}
          <Grid item xs={2} style={{minWidth:130}}/>
        </Grid>
        {/* <CalenderDrawer
           open={drawerOpen}
           toggleDrawer={toggleDrawer}
           content={drawerContent}/>*/}
        <CalenderPopUpWindow
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          content={drawerContent}
          setMyAnimation={setMyAnimation}
          setSchedule={setSchedule}
          setScheduledList={setScheduledList}
        />
        </>
    )
}
export default MyResponsiveBar;