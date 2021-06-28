import { ResponsivePie } from '@nivo/pie'


const scheduledListToData = (scheduledList) =>{
    let data = []
    if(scheduledList.length === 0){
        let item = {}
        item["id"] = "No schedule."
        item["label"] = "No schedule"
        item["value"] = 1
        data.push(item)
        return data
    }
    scheduledList.forEach((event, index)=>{
        let item = {}
        item["id"] = event.name
        item["label"] = event.name
        item["value"] = event.needtime
        data.push(item)
    })
    return data
}

const toCompleteRatioData = (scheduledList)=>{
    let data = []
    if(scheduledList.length === 0){
        let item = {}
        item["id"] = "All completed."
        item["label"] = "All completed"
        item["value"] = 1
        item["color"] = "#43a047"
        data.push(item)
        return data
    }
    else{
        let Undone = {id:"Undone", label:"Undone", color:"#f4511e"}
        let completed = {id:"Done", label:"Done",color:"#43a047"}
        let totalNum = 0
        let totalCompleted = 0
        scheduledList.forEach((event)=>{
            console.log(event)
            console.log("total", totalNum)
            totalNum += parseInt(event.needtime, 10)
            totalCompleted += (parseInt(event.needtime, 10)/parseInt(event.separate, 10))*parseInt(event.completed, 10)
        })
        Undone["value"] = totalNum-totalCompleted
        completed["value"] = totalCompleted
        data.push(Undone)
        data.push(completed)
    }
    return data
}
const makeColor=()=>{
    const specifiers = "8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"
    var n = specifiers.length / 6 | 0, colors = new Array(n), i = 0;
    while (i < n) colors[i] = "#" + specifiers.slice(i * 6, ++i * 6);
    return colors;
}

const MyResponsivePie = ({scheduledList, isPersonalInfo}) => {
    let data
    if(isPersonalInfo){
        data = toCompleteRatioData(scheduledList)
    }
    else{
        data = scheduledListToData(scheduledList)
    }
    
    return(
    <ResponsivePie
        data={data}
        margin={isPersonalInfo?{ top: 25, right: 25, bottom: 25, left: 20 }:{ top: 40, right: 80, bottom: 40, left: 240 }}
        innerRadius={isPersonalInfo?0.4:0.5}
        padAngle={0.7}
        cornerRadius={3}
        arcLinkLabelsDiagonalLength={isPersonalInfo?10:16}
        arcLinkLabelsStraightLength={isPersonalInfo?10:24}
        colors={isPersonalInfo?({ id, data }) => data["color"]:{ scheme: 'set3' }}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={isPersonalInfo?"none":{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
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
        legends={isPersonalInfo?[]:[
            {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: -220,
                translateY: 10,
                itemWidth: 50,
                itemHeight: 20,
                itemsSpacing: 2,
                symbolSize: 20,
                itemDirection: 'left-to-right',
            }
        ]}
    />
    )
}

export default MyResponsivePie