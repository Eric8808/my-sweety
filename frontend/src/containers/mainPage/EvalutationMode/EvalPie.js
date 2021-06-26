import { ResponsivePie } from '@nivo/pie'
import ScheduledList from '../ScheduledList'

const data = [
    {
      "id": "php",
      "label": "php",
      "value": 77,
      "color": "hsl(284, 70%, 50%)"
    },
    {
      "id": "elixir",
      "label": "elixir",
      "value": 208,
      "color": "hsl(87, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 478,
      "color": "hsl(273, 70%, 50%)"
    },
    {
      "id": "ruby",
      "label": "ruby",
      "value": 162,
      "color": "hsl(1, 70%, 50%)"
    },
    {
      "id": "c",
      "label": "c",
      "value": 73,
      "color": "hsl(153, 70%, 50%)"
    }
  ]

const scheduledListToData = (scheduledList) =>{
    let data = []
    if(scheduledList.length == 0){
        let item = {}
        item["id"] = "No schedule."
        item["label"] = "No schedule"
        item["value"] = 1
        data.push(item)
        return data
    }
    scheduledList.forEach((event)=>{
        let item = {}
        item["id"] = event.name
        item["label"] = event.name
        item["value"] = event.needtime
        data.push(item)
    })
    return data
}

const MyResponsivePie = ({scheduledList}) => {
    const data = scheduledListToData(scheduledList)

    return(
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'set3' }}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 50,
                itemWidth: 50,
                itemHeight: 20,
                itemsSpacing: 0,
                symbolSize: 20,
                itemDirection: 'left-to-right',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    )
}

export default MyResponsivePie