import { ResponsiveBar } from '@nivo/bar'
const data = [
    {
      "country": "AD",
      "hot dog": 25,
      "hot dogColor": "hsl(305, 70%, 50%)",
      "burger": 133,
      "burgerColor": "hsl(191, 70%, 50%)",
      "sandwich": 53,
      "sandwichColor": "hsl(99, 70%, 50%)",
      "kebab": 140,
      "kebabColor": "hsl(32, 70%, 50%)",
      "fries": 36,
      "friesColor": "hsl(17, 70%, 50%)",
      "donut": 97,
      "donutColor": "hsl(277, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 197,
      "hot dogColor": "hsl(189, 70%, 50%)",
      "burger": 52,
      "burgerColor": "hsl(13, 70%, 50%)",
      "sandwich": 73,
      "sandwichColor": "hsl(103, 70%, 50%)",
      "kebab": 157,
      "kebabColor": "hsl(328, 70%, 50%)",
      "fries": 183,
      "friesColor": "hsl(184, 70%, 50%)",
      "donut": 116,
      "donutColor": "hsl(351, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 179,
      "hot dogColor": "hsl(323, 70%, 50%)",
      "burger": 47,
      "burgerColor": "hsl(238, 70%, 50%)",
      "sandwich": 185,
      "sandwichColor": "hsl(86, 70%, 50%)",
      "kebab": 161,
      "kebabColor": "hsl(4, 70%, 50%)",
      "fries": 190,
      "friesColor": "hsl(29, 70%, 50%)",
      "donut": 172,
      "donutColor": "hsl(46, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 190,
      "hot dogColor": "hsl(43, 70%, 50%)",
      "burger": 136,
      "burgerColor": "hsl(46, 70%, 50%)",
      "sandwich": 80,
      "sandwichColor": "hsl(330, 70%, 50%)",
      "kebab": 81,
      "kebabColor": "hsl(11, 70%, 50%)",
      "fries": 60,
      "friesColor": "hsl(189, 70%, 50%)",
      "donut": 51,
      "donutColor": "hsl(209, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 33,
      "hot dogColor": "hsl(186, 70%, 50%)",
      "burger": 146,
      "burgerColor": "hsl(235, 70%, 50%)",
      "sandwich": 33,
      "sandwichColor": "hsl(142, 70%, 50%)",
      "kebab": 11,
      "kebabColor": "hsl(104, 70%, 50%)",
      "fries": 174,
      "friesColor": "hsl(197, 70%, 50%)",
      "donut": 8,
      "donutColor": "hsl(209, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 24,
      "hot dogColor": "hsl(171, 70%, 50%)",
      "burger": 196,
      "burgerColor": "hsl(183, 70%, 50%)",
      "sandwich": 87,
      "sandwichColor": "hsl(168, 70%, 50%)",
      "kebab": 83,
      "kebabColor": "hsl(14, 70%, 50%)",
      "fries": 181,
      "friesColor": "hsl(165, 70%, 50%)",
      "donut": 36,
      "donutColor": "hsl(248, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 26,
      "hot dogColor": "hsl(53, 70%, 50%)",
      "burger": 47,
      "burgerColor": "hsl(353, 70%, 50%)",
      "sandwich": 56,
      "sandwichColor": "hsl(201, 70%, 50%)",
      "kebab": 184,
      "kebabColor": "hsl(334, 70%, 50%)",
      "fries": 196,
      "friesColor": "hsl(223, 70%, 50%)",
      "donut": 42,
      "donutColor": "hsl(146, 70%, 50%)"
    }
]
const MyResponsiveBar = () => (
    <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 10, bottom: 50, left: 60 }}
        padding={0.3}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
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
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        // labelSkipWidth={12}
        // labelSkipHeight={12}
        // labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        // legends={[
        //     {
        //         dataFrom: 'keys',
        //         anchor: 'bottom-right',
        //         direction: 'column',
        //         justify: false,
        //         translateX: 120,
        //         translateY: 0,
        //         itemsSpacing: 2,
        //         itemWidth: 100,
        //         itemHeight: 20,
        //         itemDirection: 'left-to-right',
        //         itemOpacity: 0.85,
        //         symbolSize: 20,
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemOpacity: 1
        //                 }
        //             }
        //         ]
        //     }
        // ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

export default MyResponsiveBar