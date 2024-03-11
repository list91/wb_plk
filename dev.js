var arr_d_in = {
    "in0": dev[""],
    "in1": dev[""],
    "in2": dev[""],
    "in3": dev[""],
    "in4": dev[""],
    "in5": dev[""],
    "in6": dev[""],
    "in7": dev[""],
    "in8": dev[""],
    "in9": dev[""],
    "in10": dev[""],
    "in11": dev[""],
    "in12": dev[""],
    "in13": dev[""],
    "in14": dev[""],
    "in15": dev[""],
    "in16": dev[""],
    "in17": dev[""]
}

var arr_d_out = {
    "out0": dev[""],
    "out1": dev[""],
    "out2": dev[""],
    "out3": dev[""],
    "out4": dev[""],
    "out5": dev[""],
    "out6": dev[""],
    "out7": dev[""],
    "out8": dev[""],
    "out9": dev[""],
    "out10": dev[""],
    "out11": dev[""],
    "out12": dev[""],
}

// сигналы модуля расширения дискрет вход/выход
var arr_d_in_ext = {
    "in0": dev[""],
    "in1": dev[""],
    "in2": dev[""],
    "in3": dev[""],
    "in4": dev[""],
    "in5": dev[""],
    "in6": dev[""],
    "in7": dev[""],
    "in8": dev[""],
    "in9": dev[""],
    "in10": dev[""],
    "in11": dev[""],
    "in12": dev[""],
    "in13": dev[""],
    "in14": dev[""],
    "in15": dev[""],
    "in16": dev[""],
}

var arr_d_out_ext = {
    "out0": dev[""],
    "out1": dev[""],
    "out2": dev[""],
    "out3": dev[""],
    "out4": dev[""],
}


// сигналы модуля расширения дискрет вход/выход
var arr_d_in_ext = {
    "in0": dev[""],
    "in1": dev[""],
    "in2": dev[""],
    "in3": dev[""],
    "in4": dev[""],
    "in5": dev[""],
    "in6": dev[""],
    "in7": dev[""],
    "in8": dev[""],
    "in9": dev[""],
    "in10": dev[""],
    "in11": dev[""],
    "in12": dev[""],
    "in13": dev[""],
    "in14": dev[""],
    "in15": dev[""],
    "in16": dev[""],
}

var arr_d_out_ext = {
    "out0": dev[""],
    "out1": dev[""],
    "out2": dev[""],
    "out3": dev[""],
    "out4": dev[""],
}

var arr_a_in = {
    "in0": dev[""],
    "in1": dev[""],
    "in2": dev[""],
    "in3": dev[""],
    "in4": dev[""],
    "in5": dev[""],
    "in6": dev[""],
    "in7": dev[""],
}

var arr_a_out = {
    "out0": dev[""],
    "out1": dev[""],
    "out2": dev[""],
    "out3": dev[""],
    "out4": dev[""],
    "out5": dev["system/Reboot"],
    "out6": dev["system/Reboot"],
    "out7": dev["metrics/ram_used"],
    "out8": dev["wb-gpio/A1_OUT"],
    "out9": dev["buzzer/volume"],
    "out10": dev["wb-adc/A3"],
    "out11": dev["knx/data"],
    "out12": dev[""],
}

function init_modules(){
    var data_modules = {
       "arr_d_in": arr_d_in,
       "arr_d_out": arr_d_out,
       "arr_d_in_ext": arr_d_in_ext,
       "arr_d_out_ext": arr_d_out_ext,
       "arr_a_in": arr_a_in,
       "arr_a_out": arr_a_out
    };
    for (var mod_type in data_modules){
       for (var key in data_modules[mod_type]){
           try {
                log("[+] - " + mod_type + " -> " + key + " - " + data_modules[mod_type][key]);

           } catch (error) {
               // TODO тут ставим флаг о невозможности продолжать работу для дальнейшего алерта
                if (error instanceof TypeError){
                    log("[-] - " + mod_type + " -> " + key);
                } else {
                    log("[!] - " + error);
                }
           }
       } 
    }
}
init_modules();
function main() {
  // проверка дискретных в
  checkDiscreteInputs();
}

function test(){
    // если автоматически режим включен
    if(arr_d_in["in0"]){
        checkDiscreteInputs();
        checkDiscreteOutputs();    
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
  // проверка дискретных входов
  // Контроль режима. Наличие сигнала говорит о том, что включен автоматический режим.
  //if(arr_d_in['in0']){
  //  log("включен автоматический режим");
  //}
  // Контроль включения вентилятора №1. Наличие сигнала говорит о том, что включен вентилятор №1
  if(arr_d_in['in1']){
    log("включен вентилятор №1");
  }
  // Контроль включения вентилятора №2. Наличие сигнала говорит о том, что включен вентилятор №2
  if(arr_d_in['in2']){
    log("включен вентилятор №2");
  }
  // Контроль включения вентилятора №3. Наличие сигнала говорит о том, что включен вентилятор №3
  if(arr_d_in['in3']){
    log("включен вентилятор №3");
  }
  // Контроль включения двигателя загрузочного шнека. Наличие сигнала говорит о том, что включен двигатель загрузочного шнека
  if(arr_d_in['in4']){
    log("включен двигатель загрузочного шнека");
  }
  // Контроль включения двигателя выгрузки. Наличие сигнала говорит о том, что включен двигатель выгрузки
  if(arr_d_in['in5']){
    log("включен двигатель выгрузки");
  }
  // Контроль включения разгрузочных вальцов. Наличие сигнала говорит о том, что включены разгрузочные вальцы
  if(arr_d_in['in6']){
    log("включены разгрузочные вальцы");
  }
  // Контроль температуры испарителя горелки №1. Наличие сигнала говорит о том, что испаритель горелки №1 перегрет
  if(arr_d_in['in7']){
    log("испаритель горелки №1 перегрет");
  }
  // Контроль температуры корпуса горелки №1. Наличие сигнала говорит о том, что корпус горелки №1 перегрет
  if(arr_d_in['in8']){
    log("корпус горелки №1 перегрет");
  }
  // Контроль наличия пламени горелки №1. Наличие сигнала говорит о том, что в корпусе горелки №1 есть пламя
  if(arr_d_in['in9']){
    log("в корпусе горелки №1 есть пламя");
  }
  // Контроль температуры испарителя горелки №2. Наличие сигнала говорит о том, что испаритель горелки №2 перегрет
  if(arr_d_in['in10']){
    log("испаритель горелки №2 перегрет");
  }
  // Контроль температуры корпуса горелки №2. Наличие сигнала говорит о том, что корпус горелки №2 перегрет
  if(arr_d_in['in11']){
    log("корпус горелки №2 перегрет");
  }
  
  // Контроль наличия пламени горелки №2. Наличие сигнала говорит о том, что в корпусе горелки №2 есть пламя
  if(dev['in12']){
    log("в корпусе горелки №2 есть пламя");
  }
  // Контроль температуры испарителя горелки №3. Наличие сигнала говорит о том, что испаритель горелки №3 перегрет
  if(dev['in13']){
    log("испаритель горелки №3 перегрет");
  }
  // Контроль температуры корпуса горелки №3. Наличие сигнала говорит о том, что корпус горелки №3 перегрет
  if(dev['in14']){
    log("корпус горелки №3 перегрет");
  }
  // Контроль наличия пламени горелки №3. Наличие сигнала говорит о том, что в корпусе горелки №3 есть пламя
  if(dev['in15']){
    log("в корпусе горелки №3 есть пламя");
  }
  // Резерв. Свободный дискретный вход контроллера
  if(dev['in16']){
    log("Резерв");
  }
  // Резерв. Свободный дискретный вход контроллера
  if(dev['in17']){
    log("Резерв");
  }
}
