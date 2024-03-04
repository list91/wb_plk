setInterval(function name() {
  var date = new Date();
  var hour_find = 17;
  var min_find = 55;

  var hour_now = date.getHours() + 7;
  var min_now = date.getMinutes();
  // log(hour_now == hour_find && min_now == min_find);
    if (hour_now == hour_find && min_now == min_find){
      // log('dev["wb-gpio/EXT2_R3A1"] = true');
      dev["wb-gpio/EXT2_R3A1"] = false;
    } else {
      // log('dev["wb-gpio/EXT2_R3A1"] = false');
      dev["wb-gpio/EXT2_R3A1"] = false;
  }
}, 2000);

// function main() {
// }


// setInterval(main, 50);

// log(new Date());