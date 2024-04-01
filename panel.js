defineVirtualDevice('panel-logic', {
    title: 'ДЕМО СУШИЛКА' ,
    cells: {
      VentilOn: {
        title: "включить вентилятор",
	    type: "pushbutton",
        order: 1
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
        title: "подтвердить",
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

// conf = {
//   "VentilOut": "wb-gpio/EXT1_R3A1",
//   "OutValciOut": "wb-gpio/EXT1_R3A1",
//   "InValciOut": "wb-gpio/EXT1_R3A1",
//   "FireOut": "wb-gpio/EXT1_R3A1",
//   "VentilOut": "wb-gpio/EXT1_R3A1",
//   "VentilOut": "wb-gpio/EXT1_R3A1",
//   "VentilOut": "wb-gpio/EXT1_R3A1",
//   "VentilOut": "wb-gpio/EXT1_R3A1",
//   "VentilOut": "wb-gpio/EXT1_R3A1",
//   "VentilOut": "wb-gpio/EXT1_R3A1",
//        }
var arr = {
  "d": { //ДИСКРЕТНЫЕ
    "in": { //вводы
      "FillSensor1": "", // датчик заполненности 1
      "FillSensor2": ""
    },
    "out": { //выводы
      "Ventil": "wb-gpio/EXT1_R3A1",
      "UnloadingAuger": "", // разгрузочный шнек
      "UnloadingRollers": "", // разгрузочные вальцы
      "LoadingRollers": "", // загрузочные вальцы
      "GasValveSupply": "", // питание газового клапана
      "Burner": "", // горелка
      "BurnerControl": "" // автомат горения
    }
  },
  "a": { //АНАЛОГОВЫЕ
    "in": {}, //вводы
    "out": { //выводы
      "SpeedUnloadingRollers": "", // скорость разгрузочных вальцов
      "ValveLevel": "" // уровень открытия клапана
    }
  }
};


// wb-gpio/EXT1_R3A1

// кнопка вкл вентиляторы
defineRule({
  whenChanged: ["panel-logic/VentilOn"],
  then: function (newValue, devName, cellName) {    
      switchRelay(arr.d.out.Ventil)
  }
});

// кнопка вкл разгрузочные вальцы
defineRule({
  whenChanged: ["panel-logic/OutValciOn"],
  then: function (newValue, devName, cellName) {
    var t_ur = arr.d.out.UnloadingRollers
    var t_ua = arr.d.out.UnloadingAuger
    // если ВКЛЮЧАЮ то реагируем
    if (!dev[t_ur] || !dev[t_ua]) { // ТОДО обсудить
      dev[t_ur] = true
      dev[t_ua] = true
    } else {
      dev[t_ur] = false
      dev[t_ua] = false
    }
    // switchRelay("1")
    // если 1
    // подать дискретный сигнал "1" на выход разгрузочного шнека
    // подать дискретный сигнал "1" на выход разгрузочного вальцов
  }
});

// кнопка вкл загрузочный шнек
defineRule({
  whenChanged: ["panel-logic/InValciOf"],
  then: function (newValue, devName, cellName) {
    var t_lr = arr.d.out.LoadingRollers
    var t_fs1 = arr.d.in.FillSensor1
    var t_fs2 = arr.d.in.FillSensor2
    // если ВКЛЮЧАЮ то реагируем
    if (!dev[t_lr]) {
      // если датчик заполн 1 И такой же 2 == ИСТИНА  
      if (dev[t_fs1] && dev[t_fs2]) {
        log("error " + cellName) // авария
      } else {
        dev[t_lr] = true // вкл
      }
    } else {
      dev[t_lr] = false // выкл (для выкл условия не нужны)
    }
    // switchRelay("1")
    // если 1
    // ПРОВЕРКА
    //    если датчик заполн 1 И такой же 2 == ИСТИНА
    //        сигнализировать об ошибке
    //    иначе
    //        подать дискретный сигнал "1" на выход загрузочных вальцов
  }
});

// кнопка вкл горелку
defineRule({
  whenChanged: ["panel-logic/FireOn"],
  then: function (newValue, devName, cellName) {
    var t_gvs = arr.d.out.GasValveSupply
    var t_b = arr.d.out.Burner
    var t_bc = arr.d.out.BurnerControl
    // если ВКЛЮЧАЮ то реагируем
    if (!dev[t_gvs] || !dev[t_b] || !dev[t_bc]) { // ТОДО обсудить
      dev[t_gvs] = true
      dev[t_b] = true
      dev[t_bc] = true
    } else {
      dev[t_gvs] = false
      dev[t_b] = false
      dev[t_bc] = false
    }
    // switchRelay("1")
    // если 1
    // подать дискретный сигнал "1" на выход "подача питания на газовый клапан"
    // подать дискретный сигнал "1" на выход "включение горелки"
    // подать дискретный сигнал "1" на выход "включение автомата горения"

  }
});

// АНАЛОГОВЫЕ

// кнопка подтвердить уровень вальцов
defineRule({
  whenChanged: ["panel-logic/SettingOutValciOk"],
  then: function (newValue, devName, cellName) {
    var t_pl_sov = "panel-logic/SettingOutValci"
    var t_sur = arr.a.out.SpeedUnloadingRollers
    // если значение новое
    if (dev[t_pl_sov] != dev[t_sur]) {
      dev[t_sur] = dev[t_pl_sov]
    }
  }
});

// кнопка подтвердить уровень клапана
defineRule({
  whenChanged: ["panel-logic/SettingKlapanOk"],
  then: function (newValue, devName, cellName) {

    var t_pl_sk = "panel-logic/SettingKlapan"
    var t_vl = arr.a.out.ValveLevel
    var t_b = arr.d.out.Burner
    // если значение новое
    if (dev[t_pl_sk] != dev[t_vl]) {
      if (!dev[t_b]) { // ТОДО обсудить | если горелка включена
        dev[t_vl] = dev[t_pl_sk]
      } else {
        log("error " + cellName)
      }
    }
    // если 1
      // ПРОВЕРКА
      //    если горелка включить == ИСТИНА
      //        подать аналоговый сигнал "0.0 до 1.0" на выход "уровень открытия клапана"
      //    иначе
      //        сигнализировать об ошибке
      // dev["analogOutputModule/Channel 2 Dimming Level"] = dev["panel-logic/SettingKlapan"]
  }
});

//--//--//--//--//--//--//-- 

// функц свитча реле выхода
function switchRelay(arrTopic) {
  var topic = arrTopic;
  dev[topic] = !dev[topic]
}