import  ReactEcharts  from 'echarts-for-react';
import Style from '../index.css';

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



class Chart extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        hid:true
      }
    }
    hid() {
      this.setState({
        hid:!this.state.hid
      })
    }
    render(){
        return (
            <div>
                <div className={Style.inboxHead}>
                  <div>
                    <h3><i></i>Charts</h3>
                    <p>Visual Data and Statistics</p>
                  </div>
                  <div className={Style.flexbox}>
                    <div className={Style.sett}>
                      <button onClick={this.hid.bind(this)} className={Style.btt}>Settings</button>
                      <div style={{display:this.state.hid ? 'none' : 'block'}} className={Style.btthid}>
                        <div>one</div>
                        <div>two</div>
                      </div>
                    </div>
                    <button className={Style.btt}>Help</button>
                  </div>
                </div>
                <div className={Style.flexbox + " " +Style.chartbox}>
                   <div id="chartBox" className={Style.zhu}>
                       <div className={Style.charttitle}><i></i>Vertical Bars</div>
                        <ReactEcharts className={Style.Ech} option={option}/>
                   </div>
                   <div id="chartBox" className={Style.zhu}>
                        <div className={Style.charttitle}><i></i>Vertical Bars</div>
                        <ReactEcharts option={optiontwo}/>
                   </div>
               </div>
            </div>
        )
    }
    
}

export default Chart;