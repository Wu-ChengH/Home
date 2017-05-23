var option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '5%',
        right: '8%',
        bottom: '15%',
        top: '8%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
};

var optiontwo = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '5%',
        right: '8%',
        bottom: '15%',
        top: '8%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['20','40','60','80','100']
    },
    series: [
        {
            type: 'bar',
            data: [22, 64, 100, 74, 15]
        },
        {
            type: 'bar',
            data: [44, 57, 33, 44, 43]
        }
    ]
};

var regionalPopulation = {
    title : {
        text: '',
        subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['男','女']
    },
    series : [
        {
            name: '比例',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            color:["blue","red"],
            data:[
                {value:335, name:'男'},
                {value:310, name:'女'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

var population = {
    "t510105":{
        sum:828140,
        man:528140,
        woman:300000
    },
    "t510107":{
        sum:1375699,
        man:1000000,
        woman:375699
    },
    "t510108":{
        sum:938785,
        man:600000,
        woman:338785
    },
    "t510104":{
        sum:690422,
        man:490422,
        woman:200000
    },
    "t510112":{
        sum:767203,
        man:300000,
        woman:467203
    },
    "t510106":{
        sum:1200776,
        man:750000,
        woman:650776
    },
    "t510113":{
        sum:381792,
        man:200000,
        woman:181792
    },
    "t510114":{
        sum:775703,
        man:47000,
        woman:305703
    },
    "t510115":{
        sum:457070,
        man:250070,
        woman:207000
    },
    "t510124":{
        sum:896162,
        man:406162,
        woman:500000
    },
    "t510116":{
        sum:1279930,
        man:679930,
        woman:600000
    },
    "t510121":{
        sum:717227,
        man:417277,
        woman:300000
    },
    "t510129":{
        sum:502199,
        man:302199,
        woman:200000
    },
    "t510132":{
        sum:302199,
        man:202199,
        woman:100000
    },
    "t510180":{ 
        sum:456548,
        man:256548,
        woman:200000
    },
    "t510131":{ 
        sum:239562,
        man:139562,
        woman:100000
    },
    "t510181":{ 
        sum:657996,
        man:357996,
        woman:300000
    },
    "t510182":{ 
        sum:762887,
        man:462887,
        woman:300000
    },
    "t510183":{ 
        sum:612753,
        man:312753,
        woman:300000
    },
    "t510184":{ 
        sum:661120,
        man:361120,
        woman:300000
    }
}

export default {option, optiontwo, regionalPopulation, population}