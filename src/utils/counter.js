exports.counter = (stopArr) => {
  if (stopArr === []) return [0, 0, 0, 0, 0, 0];

  const counter = {
    unknown: 0,
    "under 10": 0,
    "10-17": 0,
    "18-24": 0,
    "25-34": 0,
    "over 34": 0,
  };

  stopArr.forEach((stop) => {
    if (stop.age === null) {
      counter.unknown++;
    } else {
      counter[stop.age]++;
    }
  });

  const resultArr = [
    counter.unknown,
    counter["under 10"],
    counter["10-17"],
    counter["18-24"],
    counter["25-34"],
    counter["over 34"],
  ];

  return resultArr;
};
