// Параметры ПИД-регулятора
var Kp = 13;
var Ki = 20;
var Kd = 0;
var dt = 0.05;
var setpoint = 35.0; // Целевая темераа

// Переменные для интеграла и предыдущей ошибки
var integral = 0;
var prevError = 0;

function calculatePower(percent) {
    // Проверка, что процент находится в диапазоне от 0 до 100
    if (percent < 0) {
        // console.error("Процент должен быть в диапазоне от 0 до 100");
        return 0;
    }
    if (percent > 100) {
      return 100;
    }

    // Вычисление значения мощности в диапазоне от 35 до 100
    var power = (percent / 100) * (100 - 33) + 35;
    return power;
}

// Функция для регулировки мощности вентилятора
function regulateFan(input) {
    var err = setpoint - input;
    integral += err * dt;
    var d = (err - prevError) / dt;
    prevErr = err;
    power = err * Kp + integral * Ki + d * Kd;

    var dimmingLevel = calculatePower(power*-1);

    log(dimmingLevel + " - " + power);
    dev["аналогВых/Channel 2 Dimming Level"] = dimmingLevel;
}

// Функция для получения текущей температуры
function getCurrentTemperature() {
    return dev["hwmon/Board Temperature"];
}

// Основной цикл работы ПИД-регулятора
// setInterval(function q() {
//     // Получение текущей температуры
//     var currentTemperature = getCurrentTemperature();

//     // Регулировка мощности вентилятора
//     regulateFan(currentTemperature);

//     // Вывод текущей температуры и установленной мощности вентилятора
//     log("Текущая температура:", currentTemperature.toFixed(2));
// }, 1000); // Период опроса и регулировки вентилятора в миллисекундах (1000 мс = 1 сек)
