export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860'
    // Add more colors if needed
  }
};

const randomPieChartData = (n) => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 100)); // Adjust range as needed
  }

  return data;
};

const pieDatasetObject = (color, points) => {
  return {
    backgroundColor: chartColors.default[color],
    data: randomPieChartData(points),
  };
};

export const samplePieChartData = (labels = {}, pointsPerDataset = 5) => {
  const datasets = Object.keys(chartColors.default).map((color) => {
    return pieDatasetObject(color, pointsPerDataset);
  });

  const generatedLabels = Object.values(labels); // Extract the provided labels

  if (generatedLabels.length < datasets.length) {
    // Generate additional labels if needed
    for (let i = generatedLabels.length; i < datasets.length; i++) {
      generatedLabels.push(`Dataset ${i + 1}`);
    }
  }

  return {
    labels: generatedLabels,
    datasets,
  };
};
