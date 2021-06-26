import { ResponsiveLine } from '@nivo/line'
const data = [
    {
      "id": "japan",
      "color": "hsl(144, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 68
        },
        {
          "x": "helicopter",
          "y": 72
        },
        {
          "x": "boat",
          "y": 143
        },
        {
          "x": "train",
          "y": 93
        },
        {
          "x": "subway",
          "y": 186
        },
        {
          "x": "bus",
          "y": 49
        },
        {
          "x": "car",
          "y": 253
        },
        {
          "x": "moto",
          "y": 104
        },
        {
          "x": "bicycle",
          "y": 263
        },
        {
          "x": "horse",
          "y": 150
        },
        {
          "x": "skateboard",
          "y": 165
        },
        {
          "x": "others",
          "y": 57
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(281, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 212
        },
        {
          "x": "helicopter",
          "y": 214
        },
        {
          "x": "boat",
          "y": 265
        },
        {
          "x": "train",
          "y": 20
        },
        {
          "x": "subway",
          "y": 229
        },
        {
          "x": "bus",
          "y": 192
        },
        {
          "x": "car",
          "y": 152
        },
        {
          "x": "moto",
          "y": 147
        },
        {
          "x": "bicycle",
          "y": 219
        },
        {
          "x": "horse",
          "y": 29
        },
        {
          "x": "skateboard",
          "y": 152
        },
        {
          "x": "others",
          "y": 251
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(280, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 2
        },
        {
          "x": "helicopter",
          "y": 79
        },
        {
          "x": "boat",
          "y": 173
        },
        {
          "x": "train",
          "y": 142
        },
        {
          "x": "subway",
          "y": 247
        },
        {
          "x": "bus",
          "y": 43
        },
        {
          "x": "car",
          "y": 115
        },
        {
          "x": "moto",
          "y": 106
        },
        {
          "x": "bicycle",
          "y": 27
        },
        {
          "x": "horse",
          "y": 70
        },
        {
          "x": "skateboard",
          "y": 157
        },
        {
          "x": "others",
          "y": 201
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(266, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 192
        },
        {
          "x": "helicopter",
          "y": 201
        },
        {
          "x": "boat",
          "y": 272
        },
        {
          "x": "train",
          "y": 150
        },
        {
          "x": "subway",
          "y": 186
        },
        {
          "x": "bus",
          "y": 13
        },
        {
          "x": "car",
          "y": 93
        },
        {
          "x": "moto",
          "y": 27
        },
        {
          "x": "bicycle",
          "y": 7
        },
        {
          "x": "horse",
          "y": 133
        },
        {
          "x": "skateboard",
          "y": 91
        },
        {
          "x": "others",
          "y": 221
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(282, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 161
        },
        {
          "x": "helicopter",
          "y": 80
        },
        {
          "x": "boat",
          "y": 110
        },
        {
          "x": "train",
          "y": 46
        },
        {
          "x": "subway",
          "y": 47
        },
        {
          "x": "bus",
          "y": 224
        },
        {
          "x": "car",
          "y": 34
        },
        {
          "x": "moto",
          "y": 272
        },
        {
          "x": "bicycle",
          "y": 115
        },
        {
          "x": "horse",
          "y": 247
        },
        {
          "x": "skateboard",
          "y": 291
        },
        {
          "x": "others",
          "y": 89
        }
      ]
    }
  ]

const makeData = (schedule, day) =>{
  let data = []
  let timeAvail = {id:"Available Time"}
  let timeScheduled = {id:"Scheduled Time"}
  let timeComplete = {id:"Completed Time"}
  const today = new Date()
  console.log(today)
  timeAvail["data"] = []
  timeScheduled["data"] = []
  timeComplete["data"] = []
  const backDays = [-6, -5, -4, -3, -2, -1, 0]
  backDays.forEach((backDay, index)=>{
    const tempDay = new Date()
    tempDay.setDate(today.getDate() + backDay-25)
    console.log(tempDay)
    const dayNum = tempDay.getDay()
    // // timeAvail
    let pointA = {x: `${tempDay.getMonth()+1}/${tempDay.getDate()}`, y: day[dayNum]}
    timeAvail["data"].push(pointA)
    // // timeScheduled
    // let pointS = {x: weekName}
    // // timeComplete
  })
  
  console.log(timeAvail)

  data.push(timeAvail)
  data.push(timeScheduled)
  data.push(timeComplete)
  return data
}
const MyResponsiveLine = ({schedule, day}) => {
  console.log(schedule)
  console.log(day)
  makeData(schedule, day)
  return(
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        lineWidth={4}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default MyResponsiveLine