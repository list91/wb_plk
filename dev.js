var main_process_id = null;
var isPause = false;
var isAuto = false;
var pauseMsg = "no message"


// основной цикл


// main_process_id = setInterval(function main() {
//while (1) {
//send_log(1221);

  // continue;
  // проверил подключеные модули
  // init_modules();
  
  // if (!isPause){
    
  //   // если автоматически режим включен
  //   if(arr_d_in["in0"]){
  //       checkDiscreteInputs();
  //       checkDiscreteOutputs();    
  //   }
  // } else {
  //   warning(pauseMsg)
  // }
//}  
  
// }, 2000);
function run(){
    if(main_process_id){
        clearInterval(main_process_id);
    } 
    main_process_id = setInterval(auto_check_iter, 2000);
}

// итерация основного циклас ПО
function main_process_iter(){
    // проверка подключения модулей
    init_modules();
    
    // если сейчас аварийный стоп НЕ активен
    if(!isPause){
        // если автоматический режим ВКЛЮЧЕН
        if(isAuto){
            // проверить 1 раз то что указано в авторежиме
            auto_check_iter();
        }
    }
}

// итерация авторежима
function auto_check_iter(){
    
    // проверка дискрет входы
    checkDiscreteInputs();
    
    // проверка дискрет выходы
    checkDiscreteOutputs();
}
var arr_d_in = {
    "in0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включен автоматический режим"
        }, 
    "in1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включен вентилятор 1"
        }, 
    "in2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включен вентилятор 2"
        }, 
    "in3": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включен вентилятор 3"
        }, 
    "in4": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включен двигатель загрузочного шнека"
        }, 
    "in5": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включен двигатель выгрузки"
        }, 
    "in6": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включены разгрузочные вальцы"
        }, 
    "in7": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "испаритель горелки 1 перегрет"
        }, 
    "in8": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "корпус горелки 1 перегрет"
        }, // темпер корпуса горелки №1
    "in9": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "в корпусе горелки 1 есть пламя"
        }, 
    "in10": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "испаритель горелки 2 перегрет"
        }, 
    "in11": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "корпус горелки 2 перегрет"
        }, // темпер корпуса горелки №2
    "in12": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "в корпусе горелки 2 есть пламя"
        }, 
    "in13": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "испаритель горелки 3 перегрет"
        }, 
    "in14": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "корпус горелки 3 перегрет"
        }, // темпер корпуса горелки №3
    "in15": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "в корпусе горелки 3 есть пламя"
        }, 
    "in16": {
            "mqtt": "",
            "prior": 3,
            "msg_true": "резерв"
        }, 
    "in17": {
            "mqtt": "",
            "prior": 3,
            "msg_true": "резерв"
        }  
}

var arr_d_out = {
    "out0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение вентилятора 1"
        }, 
    "out1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение горелки 1"
        }, 
    "out2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение вентилятора 2"
        }, 
    "out3": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение горелки 2"
        }, 
    "out4": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение вентилятора 3"
        }, 
    "out5": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение горелки 3"
        }, 
    "out6": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение двигателя загрузочного шнека"
        }, 
    "out7": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "выключение двигателя выгрузки"
        }, 
    "out8": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение разгрузочных вальцов"
        }, 
    "out9": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включить газовый клапан"
        }, 
    "out10": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включить освещение"
        }, 
    "out11": {
            "mqtt": "",
            "prior": 3,
            "msg_true": "резерв"
        }
}

// сигналы модуля расширения дискрет вход/выход
var arr_d_in_ext = {
    "in0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""// TODO NONE
        }, 
    "in1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "дверь закрыта"
        }, 
    "in2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "загрузочный шнек в работе"
        }, 
    "in3": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "левая колонна 1 не перегрета"
        }, 
    "in4": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "правая колонна 1 не перегрета"
        }, 
    "in5": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "левая колонна 2 не перегрета"
        }, 
    "in6": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "правая колонна 2 не перегрета"
        }, 
    "in7": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "дозирующие вальцы в работе"
        }, 
    "in8": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "сушилка заполнена"
        }, 
    "in9": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "зерно есть в сушилке"
        }, 
    "in10": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "нет перегрева в камере 1"
        }, 
    "in11": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "нет перегрева в камере 2"
        }, 
    "in12": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "нет перегрева в камере 3"
        }, 
    "in13": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "давление в камере 1 есть"
        }, 
    "in14": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "давление в камере 2 есть"
        }, 
    "in15": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "давление в камере 3 есть"
        }, 
    "in16": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "авария питания, проблемы в сети"
        }, 
}

var arr_d_out_ext = {
    "out0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение автомата горения 1"
        }, 
    "out1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение автомата горения 2"
        }, 
    "out2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": "включение автомата горения 3"
        }, 
    "out2": {
            "mqtt": "",
            "prior": 3,
            "msg_true": "резерв"
        }, 
    "out4": {
            "mqtt": "",
            "prior": 3,
            "msg_true": "резерв"
        }, 
}


// сигналы модуля расширения дискрет вход/выход
var arr_d_in_ext = {
    "in0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in3": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in4": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in5": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in6": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in7": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in8": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in9": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in10": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in11": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in12": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in13": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in14": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in15": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in16": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
}

var arr_d_out_ext = {
    "out0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out3": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out4": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
}

var arr_a_in = {
    "in0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in3": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in4": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in5": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in6": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "in7": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
}

var arr_a_out = {
    "out0": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out1": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out2": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out3": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out4": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out5": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out6": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out7": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out8": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out9": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out10": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out11": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
    "out12": {
            "mqtt": "",
            "prior": 1,
            "msg_true": ""
        }, 
}
//TODO 3 уровня важности(1-все стоп; 2-предупреждение; 3-только запись в лог)
var data_modules = {
       "arr_d_in": arr_d_in,
       "arr_d_out": arr_d_out,
       "arr_d_in_ext": arr_d_in_ext,
       "arr_d_out_ext": arr_d_out_ext,
       "arr_a_in": arr_a_in,
       "arr_a_out": arr_a_out
    };
function init_modules(){
    for (var mod_type in data_modules){
       for (var key in data_modules[mod_type]){
           try {
               // TODO сделать проверку иначе (не вызывая в консоль)
                var topic = data_modules[mod_type][key]["mqtt"];
                var value = dev[topic];
                send_log("[+] - " + mod_type + " -> " + key + " - " + value);
           } catch (error) {
                if (error instanceof TypeError){
                    fault_handling(true, "[-] - " + mod_type + " -> " + topic);
                } else {
                    fault_handling(true, "[!] - " + error);
                }
           }
       } 
    }
}
function send_log(msg){
    // запись сообщения в файл лога
    log(msg);
}

// обработка неисправностей модуля
function fault_handling(stop, log_msg){
    isPause = stop
    send_log(log_msg);
    if(isPause){
      // пауза цикла итераций автоматики
      // clearInterval(main_process_id)
      // continue;
    }
}

function checkDiscreteOutputs() {
  // проверка дискретных выходов
  // Включение вентилятора №1. Подача сигнала на включение вентилятора №1
  if(arr_d_out['out0']){
      arr_d
    log("Подача сигнала на включение вентилятора №1");
  }
  // Включение горелки №1. Подача сигнала на включение горелки №1
  if(arr_d_out['out1']){
    log("Подача сигнала на включение горелки №1");
  }
  // Включение вентилятора №2. Подача сигнала на включение вентилятора №2
  if(arr_d_out['out2']){
    log("Подача сигнала на включение вентилятора №2");
  }
  // Включение горелки №2. Подача сигнала на включение горелки №2
  if(arr_d_out['out3']){
    log("Подача сигнала на включение горелки №2");
  }
  // Включение вентилятора №3. Подача сигнала на включение вентилятора №3
  if(arr_d_out['out4']){
    log("Подача сигнала на включение вентилятора №3");
  }
  // Включение горелки №3. Подача сигнала на включение горелки №3
  if(arr_d_out['out5']){
    log("Подача сигнала на включение горелки №3");
  }
  // Включение двигателя. Подача сигнала на включение двигателя загрузочного шнека
  if(arr_d_out['out6']){
    log("Подача сигнала на включение двигателя загрузочного шнека");
  }
  // Включение двигателя. Подача сигнала на включение двигателя выгрузки
  if(arr_d_out['out7']){
    log("Подача сигнала на включение двигателя выгрузки");
  }
  // Включение разгрузочных вальцов. Подача сигнала на включение разгрузочных вальцов
  if(arr_d_out['out8']){
    log("Подача сигнала на включение разгрузочных вальцов");
  }
  // Подача питания на газовый клапан
  if(arr_d_out['out9']){
    log("Подача питания на газовый клапан");
  }
  // Питание освещения. Подача сигнала на включение освещения
  if(arr_d_out['out10']){
    log("Подача сигнала на включение освещения");
  }
  // Резерв. Свободный дискретный выход контроллера
  if(arr_d_out['out11']){
    log("Свободный дискретный выход контроллера");
  }
 }
function checkDiscreteInputs() {
    
    for (var mod_type in data_modules){
           for (var key in data_modules[mod_type]){
               try {
                    // TODO сделать проверку иначе (не вызывая в консоль)
                    var topic = data_modules[mod_type][key]["mqtt"];
                    var priority = data_modules[mod_type][key]["prior"];
                    var msg_true = data_modules[mod_type][key]["msg_true"];
                    var value = dev[topic];
                    check_module(topic, priority, msg_true);
                   //send_log("[+] - " + mod_type + " -> " + key + " - " + value);
                } catch (error) {
                    // TODO возможно отказаться от проверки на 
                    // подключение модулей в начале главной итерации
                    if (error instanceof TypeError){
                        fault_handling(true, "[-] - " + mod_type + " -> " + topic);
                    } else {
                        fault_handling(true, "[!] - " + error);
                    }
                }
            } 
    }
}
function checkDiscreteInputs() {
  // проверка дискретных входов
  // Контроль режима. Наличие сигнала говорит о том, что включен автоматический режим.
  //if(arr_d_in['in0']){
    
    // Контроль включения вентилятора №1. Наличие сигнала говорит о том, что включен вентилятор №1
    check_module(arr_d_in['in1'], null, "включен вентилятор №1");
  
    // Контроль включения вентилятора №2. Наличие сигнала говорит о том, что включен вентилятор №2
    check_module(arr_d_in['in2'], null, "включен вентилятор №2");  
    
    // Контроль включения вентилятора №3. Наличие сигнала говорит о том, что включен вентилятор №3
    check_module(arr_d_in['in3'], null, "включен вентилятор №3");  
  
    // Контроль включения двигателя загрузочного шнека. Наличие сигнала говорит о том, что включен двигатель загрузочного шнека
    check_module(arr_d_in['in4'], null, "включен двигатель загрузочного шнека");  
  
    // Контроль включения двигателя выгрузки. Наличие сигнала говорит о том, что включен двигатель выгрузки
    check_module(arr_d_in['in5'], null, "включен двигатель выгрузки");  
  
    // Контроль включения разгрузочных вальцов. Наличие сигнала говорит о том, что включены разгрузочные вальцы
    check_module(arr_d_in['in6'], null, "включены разгрузочные вальцы");  
  
    // Контроль температуры испарителя горелки №1. Наличие сигнала говорит о том, что испаритель горелки №1 перегрет
    check_module(arr_d_in['in7'], true, "испаритель горелки №1 перегрет");  
    
    // Контроль температуры корпуса горелки №1. Наличие сигнала говорит о том, что корпус горелки №1 перегрет
    check_module(arr_d_in['in8'], true, "корпус горелки №1 перегрет");  
  
    // Контроль наличия пламени горелки №1. Наличие сигнала говорит о том, что в корпусе горелки №1 есть пламя
    check_module(arr_d_in['in9'], null, "в корпусе горелки №1 есть пламя");  
  
    // Контроль температуры испарителя горелки №2. Наличие сигнала говорит о том, что испаритель горелки №2 перегрет
    check_module(arr_d_in['in10'], true, "испаритель горелки №2 перегрет");  
  
    // Контроль температуры корпуса горелки №2. Наличие сигнала говорит о том, что корпус горелки №2 перегрет
    check_module(arr_d_in['in11'], true, "корпус горелки №2 перегрет");
  
    // Контроль наличия пламени горелки №2. Наличие сигнала говорит о том, что в корпусе горелки №2 есть пламя
    check_module(arr_d_in['in12'], true, "в корпусе горелки №2 есть пламя");
  
    // Контроль температуры испарителя горелки №3. Наличие сигнала говорит о том, что испаритель горелкиtrueперегрет
    check_module(arr_d_in['in13'], true, "испаритель горелки №3 перегрет");
  
    // Контроль температуры корпуса горелки №3. Наличие сигнала говорит о том, что корпус горелки №3 перегрет
    check_module(arr_d_in['in14'], true, "корпус горелки №3 перегрет");
  
    // Контроль наличия пламени горелки №3. Наличие сигнала говорит о том, что в корпусе горелки №3 есть пламя
    check_module(arr_d_in['in15'], true, "в корпусе горелки №3 есть пламя");
  
    // Резерв. Свободный дискретный вход контроллера
    check_module(arr_d_in['in16'], true, "Резерв");
  
    // Резерв. Свободный дискретный вход контроллера
    check_module(arr_d_in['in17'], true, "Резерв");
}
function check_module(mod, crit, msg){
    if(mod){
        fault_handling(crit, msg);
    }
}
