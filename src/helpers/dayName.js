import _ from 'lodash';

export const dayName = (dayNo) => {
  if (dayNo === 0) return 'Su';
  else if (dayNo === 1) return 'M';
  else if (dayNo === 2) return 'Tu';
  else if (dayNo === 3) return 'W';
  else if (dayNo === 4) return 'Th';
  else if (dayNo === 5) return 'F';
  else if (dayNo === 6) return 'Sa';
}

export const iconNameEdit = (name) => {
  if(name === 'partly-cloudy-day') {
    console.log(_.replace(name,'-day','') + 'remove day');
    return _.replace(name,'-day','');
  } else if (name === 'partly-cloudy-night') {
    console.log(_.replace(name,'-night','') + 'remove night');
    return _.replace(name,'-night','');
  } else {
    console.log(name + 'No remove');
    return name;
  }
}
