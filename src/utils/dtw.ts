type DTWDict = { [key: string]: number };

// DTWの計算
function dtwDistance(s1: number[], s2: number[]): number {
  const DTW: DTWDict = {};

  for (let i = 0; i < s1.length; i++) {
    DTW[`${i},-1`] = Infinity;
  }
  for (let i = 0; i < s2.length; i++) {
    DTW[`-1,${i}`] = Infinity;
  }
  DTW['-1,-1'] = 0;

  for (let i = 0; i < s1.length; i++) {
    for (let j = 0; j < s2.length; j++) {
      const dist = (s1[i] - s2[j]) ** 2;
      DTW[`${i},${j}`] =
        dist + Math.min(DTW[`${i - 1},${j}`], DTW[`${i},${j - 1}`], DTW[`${i - 1},${j - 1}`]);
    }
  }

  return Math.sqrt(DTW[`${s1.length - 1},${s2.length - 1}`]);
}

const relaxationLevels = (days: string[]) => {
  const calendarData = days.map((day) => Array.from(day).map((hour) => parseInt(hour)));

  // 曜日ごとの平均データを計算
  const averageDataPerDay: { [key: number]: number[] } = {};
  for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
    const dayData = calendarData.filter((_, index) => index % 7 === dayIdx);
    averageDataPerDay[dayIdx] = dayData[0].map(
      (_, colIdx) => dayData.reduce((sum, row) => sum + row[colIdx], 0) / dayData.length,
    );
  }

  // 各日のデータと曜日の平均データとのDTW距離を計算
  const irregularities = calendarData.map((dayData, i) => {
    const dayIdx = i % 7;
    const avgData = averageDataPerDay[dayIdx];
    return dtwDistance(dayData, avgData) ** 2;
  });

  const dailyAppointments = calendarData.map((day) => day.reduce((sum, hour) => sum + hour, 0));
  const busyness = dailyAppointments.map((app, idx) => app + irregularities[idx]);

  // relaxationLevels の計算
  return calculateRelaxationLevels(busyness);
};

function calculateRelaxationLevels(busyness: number[]): number[] {
  const maxVal = Math.max(...busyness);
  const minVal = Math.min(...busyness);
  const thresholds = Array.from({ length: 3 }).map(
    (_, i) => minVal + ((i + 1) * (maxVal - minVal)) / 4,
  );

  return busyness.map((value) => {
    if (value < thresholds[0]) return 3;
    else if (value < thresholds[1]) return 2;
    else if (value < thresholds[2]) return 1;
    else return 0;
  });
}

export { relaxationLevels };

const days = [
  '000000001111101110000000',
  '000000001111101110000000',
  '000000001111101110001100',
  '000000001111101110000000',
  '000000001111101110000000',
  '000000000000111111000000',
  '000000000000000000000000',
];

console.log(relaxationLevels(days));
