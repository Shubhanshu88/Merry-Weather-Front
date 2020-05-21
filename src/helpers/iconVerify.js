const iconVerify = (name) => {
  if(name === "fog") {
    return "wind";
  } else if (name === "hail") {
    return "snow";
  } else if (name === 'partly-cloudy-night') {
    return 'partly-cloudy-day';
  } else {
    return name;
  }
};

export default iconVerify;