defineVirtualDevice('panel-logic', {
    title: 'ДЕМО СУШИЛКА' ,
    cells: {
      IndicatorVentilOn: {
        title: "состояние вентилятора",
	    type: "value",
	    value: 0,
        order: 1
	    },
      IndicatorOutValciOn: {
        title: "состояние разгрузочных вальцов",
	    type: "value",
	    value: 0,
        order: 1
	    },
      IndicatorInValciOf: {
        title: "состояние загрузочных вальцов",
	    type: "value",
	    value: 0,
        order: 1
	    },
      IndicatorFireOn: {
        title: "состояние горелки",
	    type: "value",
	    value: 0,
        order: 1
	    },
      IndicatorSettingOutValci: {
        title: "уровень разгрузочных вальцов",
	    type: "value",
	    value: 0,
        order: 1
	    },
      IndicatorSettingKlapan: {
        title: "уровень клапана",
	    type: "value",
	    value: 0,
        order: 1
	    },//--//--//--//--//--//--//--//--/вверху индикация/--//--//--//--//--//--//--//--//--//--//--//--//--//--
      VentilOn: {
        title: "вкл вентилятор",
	    type: "pushbutton",
        order: 2
	    },
      OutValciOn: {
        title: "включить разгрузочные вальцы",
	    type: "pushbutton",
        order: 2
	    },
      InValciOf: {
        title: "включить загрузочные вальцы",
	    type: "pushbutton",
        order: 3
	    },
      FireOn: {
        title: "включить горелку",
	    type: "pushbutton",
        order: 4
	    },
      SettingOutValci: {
        title: "уровень разгрузочных вальцов",
	    type: "value",
	    value: 25,
        units: "°C",
        readonly: false,
        order: 5
	    },
      SettingOutValciOk: {
        title: "подтвердить valci",
	    type: "pushbutton",
        order: 5
	    },
      SettingKlapan: {
        title: "уровень клапана",
	    type: "value",
	    value: 25,
        units: "°C",
        readonly: false,
        order: 5
	    },
      SettingKlapanOk: {
        title: "подтвердить",
	    type: "pushbutton",
        order: 5
	    },
    }
})

var arr = {
  "d": { //ДИСКРЕТНЫЕ
    "in": { //вводы
        "FillSensors": {  // датчики заполненности 2шт
            0: {
                "FillSensor": "wb-gpio/EXT2_IN1"
            },
            1: {
                "FillSensor": "wb-gpio/EXT2_IN2"
            }
      },
    },
    "out": { //выводы
      "VentilAndBurnerModules": {
            0: {
                "Ventil": "wb-gpio/EXT1_R3A1",
                "Burner": "wb-gpio/EXT1_R3A2", // горелка
                "BurnerControl": "wb-gpio/EXT1_R3A3" // автомат горения
            }
      },
    "UnloadingAuger": "wb-gpio/EXT1_R3A4", // разгрузочный шнек
    "UnloadingRollers": "wb-gpio/EXT1_R3A5", // разгрузочные вальцы
    "LoadingRollers": "wb-gpio/EXT1_R3A6", // загрузочные вальцы
    "GasValveSupply": "wb-gpio/EXT1_R3A7", // питание газового клапана
    }
  },
  "a": { //АНАЛОГОВЫЕ
    "in": {}, //вводы
    "out": { //выводы
      "SpeedUnloadingRollers": "analogOutputModule/Channel 1 Dimming Level", // скорость разгрузочных вальцов
      "ValveLevel0": "analogOutputModule/Channel 2 Dimming Level", // уровень открытия клапана
    }
  }
};


// функция обновления индикатора
function updateIndicator(topic, indicatorCell) {
  log(indicatorCell)
  if (dev[topic]) {
    dev[indicatorCell] = 1; // установить значение индикатора в 1, если топик истинный
  } else {
    dev[indicatorCell] = 0; // установить значение индикатора в 0, если топик ложный
  }
}
function createRule(topicCell, func) {
  // log(topicCell)
    defineRule({
        whenChanged: ["panel-logic/" + topicCell],
        then: function q(){func.apply(null, arguments)}
    })
}

function createVentil(topic) {
  var topic = arr.d.out.VentilAndBurnerModules[0].Ventil;
  var topicW = "VentilOn";
  // log(topic)
  // кнопка вкл вентиляторы
  createRule(topicW, function (newValue, devName, cellName) {
      switchRelay(topic);      
      updateIndicator(topic, "panel-logic/Indicator" + topicW); // обновление индикатора
  })
  // обновление индикатора вентилятора
  createRule(topic, function (newValue, devName, cellName) {
      updateIndicator(topic, "panel-logic/Indicator" + topicW); // обновление индикатора
  })
}
function createBurnLogic(index) {
  var topic = "FireOn"
  // createRule(topic, FireOnBody(index))

  createRule(topic, function (newValue, devName, cellName) {
      FireOnBody(index)
      // switchRelay(topic);      
      // updateIndicator(topic, "panel-logic/Indicator" + topicW); // обновление индикатора
  })
  
}
function OutValciOnBody() {    
    var t_ur = arr.d.out.UnloadingRollers
    var t_ua = arr.d.out.UnloadingAuger
    // если ВКЛЮЧАЮ то реагируем
    if (!dev[t_ur] && !dev[t_ua]) {
      dev[t_ur] = true
      dev[t_ua] = true
    } else {
      dev[t_ur] = false
      dev[t_ua] = false
    }
  }
function InValciOfBody() {
    var t_lr = arr.d.out.LoadingRollers
    var t_fs1 = arr.d.in.FillSensors[0].FillSensor
    var t_fs2 = arr.d.in.FillSensors[1].FillSensor
    // если ВКЛЮЧАЮ то реагируем
    if (!dev[t_lr]) {
      // если датчик заполн 1 И такой же 2 == ИСТИНА  
      if (dev[t_fs1] && dev[t_fs2]) {
        log("error ") // авария
      } else {
        dev[t_lr] = true // вкл
      }
    } else {
      dev[t_lr] = false // выкл (для выкл условия не нужны)
    }
}
function FireOnBody(index) {
    var burnModules = arr.d.out.VentilAndBurnerModules
    var t_v = burnModules[index].Ventil
    var t_gvs = arr.d.out.GasValveSupply
    var t_b = burnModules[index].Burner
    var t_bc = burnModules[index].BurnerControl
  log(dev[t_b])

    // если ВКЛЮЧАЮ
    if (!dev[t_b]) {
    // log(1)
      if (dev[t_v]) { // если вентилятор включен
        log("если вентилятор включен")
        
        // проверяю если помимо ЭТОЙ горелки не включена НИ ОДНА(сгруппировать горелки)
        // нужно иметь доступ к ТЕКУЩЕЙ и ко ВСЕМ
        var count = 0
        // for (let module of burnModules) {
        for (var index = 0; index < burnModules; index++) {
          if (burnModules[index].Burner) {
            count++
          }
        }

        if (count == 0) { // если я ОДИН при ВКЛЮЧЕНИИ
          // 1. даю газ ("подача питания на газовый клапан")
          dev[t_gvs] = true
          
          // 2. врубаю ЕГО сименс ("включение горелки")
          dev[t_b] = true
          
          // 3. даю искру на ЭТУ горелку ("включение автомата горения")
          dev[t_bc] = true
          setTimeout(function name(params) {
            dev[t_bc] = false            
          },1000)
        } else { // если я НЕ ОДИН при ВКЛЮЧЕНИИ
          // 1. врубаю ЕГО сименс ("включение горелки")
          dev[t_b] = true

          // 2. даю искру на ЭТУ горелку ("включение автомата горения")
          dev[t_bc] = true
          dev[t_bc] = false
        }
        
      }
    } else { // если ВЫКЛЮЧАЮ
      var count = 0
      for (var index = 0; index < burnModules; index++) {
          if (burnModules[index].Burner) {
            count++
          }
      }
      if (count <= 1) { // если я ОДИН при ВЫКЛЮЧЕНИИ
        log("если я ОДИН при ВЫКЛЮЧЕНИИ")
        //     1. перекрываю газ ("подача питания на газовый клапан")
        dev[t_gvs] = false
        // log(dev[t_gvs])
        
        //     2. вырубаю ЕГО сименс ("включение горелки")
        log(dev[t_b])
        dev[t_b] = false
      } else { // если я НЕ ОДИН при ВКЛЮЧЕНИИ
        log(count)
        //     1. врубаю ЕГО сименс ("включение горелки")        
        dev[t_b] = false
      }
    }
}

function updateWatchValci(topic, widget) {
  var topicW = widget//"SettingOutValci";
  var t_sur = topic
  // кнопка вкл вентиляторы
  createRule(topicW + "Ok", function (newValue, devNamet_sur, cellName) {
    var t_pl_sov = "panel-logic/" + topicW
    log(dev[t_pl_sov])
    log(dev[t_sur])
    // если значение новое
    if (dev[t_pl_sov] != dev[t_sur]) {
      dev[t_sur] = dev[t_pl_sov]
    }
  })
  // обновление индикатора вентилятора
}
// function updateWatchKlapan(topic, widget) {
//   var topicW = widget//"SettingOutValci";
//   var t_sur = topic
//   // кнопка вкл вентиляторы
//   createRule(topicW + "Ok", function (newValue, devNamet_sur, cellName) {
//     var t_pl_sov = "panel-logic/" + topicW
//     log(dev[t_pl_sov])
//     log(dev[t_sur])
//     // если значение новое
//     if (dev[t_pl_sov] != dev[t_sur]) {
//       dev[t_sur] = dev[t_pl_sov]
//     }
//   })
//   // обновление индикатора вентилятора
// }


// создал прослушку нажатия и обновления значения вентиля
createVentil()

// кнопка вкл разгрузочные вальцы
createRule("OutValciOn", OutValciOnBody)

// кнопка вкл загрузочный шнек
createRule("InValciOf", InValciOfBody)

// кнопка вкл горелку
createBurnLogic(0)

// АНАЛОГОВЫЕ

updateWatchValci(arr.a.out.SpeedUnloadingRollers, "SettingOutValci")
updateWatchValci(arr.a.out.ValveLevel0, "SettingKlapan")

// кнопка подтвердить уровень клапана
// defineRule({
//   whenChanged: ["panel-logic/SettingKlapanOk"],
//   then: function (newValue, devName, cellName) {

//     var t_pl_sk = "panel-logic/SettingKlapan"
//     var t_vl = arr.a.out.ValveLevel
//     var t_b = arr.d.out.Burner
//     // если значение новое
//     if (dev[t_pl_sk] != dev[t_vl]) {
//       if (!dev[t_b]) { // ТОДО обсудить | если горелка включена
//         dev[t_vl] = dev[t_pl_sk]
//       } else {
//         log("error " + cellName)
//       }
//     }
//   }
// });

//--//--//--//--//--//--//-- 

// функц свитча реле выхода
function switchRelay(arrTopic) {
  // log(arrTopic)
  var topic = arrTopic;
  dev[topic] = !dev[topic]
}