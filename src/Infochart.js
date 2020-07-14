import React from 'react'
import { StyleSheet, Text, View ,ScrollView,Image,TouchableOpacity,Dimensions,AsyncStorage} from 'react-native'
import {LineChart,PieChart} from "react-native-chart-kit";
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import NumberFormat from 'react-number-format';
var jwtDecode = require('jwt-decode');
const Infochart = () => {
  const [current, setCurrent] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [totalmoney, setTotalmoney] = React.useState(0);
  const [labels, setLabels] = React.useState(Last7Days(0));
  const [datasets, setDatasets] = React.useState([0,0,0,0,0,0,0]);
  const dataa = [
  {
    name: "Siêu thị",
    money: 0,
    color: "#CBCBCC",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Căn tin",
    money: 0,
    color: "#999999",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Thư viện",
    money: 0,
    color: "#666666",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Giữ xe",
    money: 0,
    color: "#000000",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];
  const [dataPieChart, setDataPieChart] = React.useState(dataa);
  function Last7Days (x) {
    return '0123456'.split('').map(function(n) {
        var d = new Date();
        d.setDate(d.getDate() - 7*x - n);
        return (function(day, month) {
            return [day<10 ? '0'+day : day, month<10 ? '0'+month : month].join('/');
        })(d.getDate(), d.getMonth()+1);
    }).reverse();
  }
  function getDataChart(resData,resLabel){
    var newData = [0,0,0,0,0,0,0];
    var newDatapiechart = dataa;
    var sum = 0;
    for(let i = 0; i< newData.length ; i++){
      var date = resLabel[i];
      var sub =date.split('/');
      for(let j = 0 ; j< resData.length ; j++){
        var itemDate = new Date(resData[j].date);
        if(sub[0]== itemDate.getDate() && sub[1] == (itemDate.getMonth()+1)) {
          newData[i] += resData[j].price;
          sum += resData[j].price;
          switch(resData[j].type){
            case 'market':
              newDatapiechart[0].money += resData[j].price;
              break;
            case 'library':
              newDatapiechart[2].money += resData[j].price;
              break;
            case 'canteen':
              newDatapiechart[1].money += resData[j].price;
              break;
            case 'bike':
              newDatapiechart[3].money += resData[j].price;
              break;
            default:break;
          }
        }
      }
    }
    setDataPieChart(newDatapiechart)
    setDatasets(newData);
    setTotalmoney(sum);
  }
  React.useEffect(() => {
    if(username==''){
      AsyncStorage.getItem('userToken', (err, result) => {
        var decoded = jwtDecode(result);
          setUsername(decoded.user);
      });
    }else{
      setLoad(true);
      axios.post('https://vlu-ewallet.herokuapp.com/payment/historyUser',{
        username:username
      }).then(res =>{
         setData(res.data);
         getDataChart(res.data,Last7Days(0));
         setLoad(false);
       }).catch(err =>{
           console.error(err);
        })
    }
  }, [username]);


  var getDaysInMonth = function(month,year) {
    return new Date(year, month, 0).getDate();
  };

    return (
      <>
        {load?(
          <Animatable.View style={{alignItems:'center',justifyContent:'center',flex:1}}
            animation='bounceIn'>
            <LottieView style={{width:200}} source={require('../anim/2469-dino-dance.json')} autoPlay loop />
          </Animatable.View>
        ):(
        <Animatable.View animation='fadeInUpBig' style={{alignItems:'center',marginVertical:20}}>
          <Text style={{fontSize:20}}>Thống kê thanh toán</Text>

          <LineChart
            data={{
              labels: labels,
              datasets: [{data:datasets,}]
            }}
            width={Dimensions.get("window").width-20} // from react-native
            height={220}
            yAxisSuffix="đ"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#6c6c6c",
              backgroundGradientFrom: "#6c6c6c",
              backgroundGradientTo: "#BBBBBB",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 20,
            }}
          />
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>minus()}>
            <Icon  name="chevron-left"size={20}  color='#4388D6'/>
          </TouchableOpacity>
          <Text>Từ ngày {labels[0]} đến ngày {labels[labels.length-1]}</Text>
          <TouchableOpacity style={{paddingHorizontal:20}} onPress={()=>add()}>
            <Icon  name="chevron-right"size={20}  color='#4388D6'/>
          </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',padding:30}}>
            <Text style={{flex:1,fontSize:17}}>Tổng chi tiêu: </Text>
            <NumberFormat
               value={totalmoney}
               displayType={'text'}
               thousandSeparator={true}
               suffix={'đ'}
               renderText={formattedValue => <Text  style={{fontSize:17,fontWeight:'bold'}}>{formattedValue}</Text>} // <--- Don't forget this!
             />
          </View>
          <PieChart
            data={dataPieChart}
            width={Dimensions.get("window").width-20}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#1E2923",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#08130D",
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false }}
            accessor="money"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </Animatable.View>
        )}
      </>
    )

    function minus(){
      let currentPage = current;
      setLabels(Last7Days(currentPage +1));
      setCurrent(currentPage+1);
      getDataChart(data,Last7Days(currentPage +1));
    }
    function add(){
      let currentPage = current;
      setLabels(Last7Days(currentPage -1));
      setCurrent(currentPage-1)
      getDataChart(data,Last7Days(currentPage -1));
    }
}

export default Infochart

const styles = StyleSheet.create({

})
