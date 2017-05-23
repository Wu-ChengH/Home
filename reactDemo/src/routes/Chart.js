import  ReactEcharts  from 'echarts-for-react';
import Style from '../index.css';
const Icon = require('uxcore-icon');
import 'uxcore/assets/iconfont.css';
import 'uxcore/assets/orange.css';
require('../utils/chengdu.js');
import {option, optiontwo, regionalPopulation, population} from './chartTool/vertical';

var chengdu = {
    series: [{
        type: 'map',
        map: 'chengdu'
    }]
}

class Chart extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        hid:true,
        region: '',
        regionalPopulation: regionalPopulation,
        population:'',
      }
    }
    componentDidMount() {
    }
    hid() {
      this.setState({
        hid:!this.state.hid
      })
    }
    onChartClick(param, echart) {
        console.log(param);
        var sunId = '';
        var sum = population;
        var regionName = param.name
        var pie = regionalPopulation;
        var regionId = sunId;

        if (regionName == "青羊区") {
          sunId = "t510105";
        } else if (regionName == "武侯区") {
          sunId = "t510107";
        } else if (regionName == "成华区") {
          sunId = "t510108";
        } else if (regionName == "锦江区") {
          sunId = "t510104";
        } else if (regionName == "龙泉驿区") {
          sunId = "t510112";
        } else if (regionName == "金牛区") {
          sunId = "t510106";
        } else if (regionName == "青白江区") {
          sunId = "t510113";
        } else if (regionName == "新都区") {
          sunId = "t510114";
        } else if (regionName == "温江区") {
          sunId = "t510115";
        } else if (regionName == "郫都区") {
          sunId = "t510124";
        } else if (regionName == "双流区") {
          sunId = "t510116";
        } else if (regionName == "金堂县") {
          sunId = "t510121";
        } else if (regionName == "大邑县") {
          sunId = "t510129";
        } else if (regionName == "新津县") {
          sunId = "t510132";
        } else if (regionName == "简阳市") {
          sunId = "t510180";
        } else if (regionName == "蒲江县") {
          sunId = "t510131";
        } else if (regionName == "都江堰市") {
          sunId = "t510181";
        } else if (regionName == "彭州市") {
          sunId = "t510182";
        } else if (regionName == "邛崃市") {
          sunId = "t510183";
        } else if (regionName == "崇州市") {
          sunId = "t510184";
        }
        pie.title.text = regionName;
        pie.series[0].data[0].value = sum[sunId].man;
        pie.series[0].data[1].value = sum[sunId].woman;

        this.me.setState({
          regionalPopulation: pie,
        })
    }
    onMapSelect(param, echart) {
        console.log(param, echart);
        alert('chart select');
    }
    render(){
      let onEvents = {
          'me':this,
          'click': this.onChartClick,
      };
        return (
            <div>
                <div className={Style.inboxHead}>
                  <div className={Style.tit}>
                    <h3><Icon name="zhexiantu" />Charts</h3>
                    <p>Visual Data and Statistics</p>
                  </div>
                  <div className={Style.flexbox}>
                    <div className={Style.sett}>
                      <div className={Style.btt}>
                        <Icon name="shezhi" />
                        Settings
                        <div className={Style.hidclick} onClick={this.hid.bind(this)}>
                          <b></b>
                        </div>
                      </div>
                      <div style={{display:this.state.hid ? 'none' : 'block'}} className={Style.btthid}>
                        <div className={Style.hoveWhite}>
                          <Icon name="zengjia1" />
                          New File
                        </div>
                        <div className={Style.hoveWhite}>
                          <Icon name="lianjie" />
                          Files Left
                        </div>
                        <div className={Style.hoveWhite}>
                          <Icon name="xinwen1" />
                          Browse Files
                        </div>
                      </div>
                    </div>
                    <div className={Style.btt}>
                      <Icon name="xiaolian-line" />
                      Help
                    </div>
                  </div>
                </div>
                <div className={Style.parting}>
                  <span></span>
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
                
               <h3 style={{border:'1px solid #ccc',borderBottom:'none',height:40, textAlign: 'center', lineHeight:'40px', marginTop:30}}>成都市男女比例数据联动</h3>
               <div style={{border:'1px solid #ccc',marginBottom:'50px'}} className={Style.flexbox}>
                 <div style={{display: 'block',width:"50%"}}>
                   <ReactEcharts option={this.state.regionalPopulation}/>
                 </div>
                 <div style={{display: 'block',width:"50%", float:'left',borderLeft:'1px solid #ccc'}}>
                   <ReactEcharts option={chengdu} onEvents={onEvents}/>
                 </div>
               </div>
            </div>
        )
    }
    
}

export default Chart;