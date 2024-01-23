/*
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
*/

/* 
const canvas = document.getElementById('myChart');
canvas.height = 75;

const labels = [
  'dju32',
  'ad6b2',
  '0f23f',
  'asd4c',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Test',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 4],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const myChart = new Chart(
  canvas,
  config
);

// function to update the chart 
function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
}

// randomly add new data
setInterval(function() {
  const newLabel = (Math.random() + 1).toString(36).substring(7);
  const newData = Math.floor(Math.random() * 10);
  addData(myChart, newLabel, newData);
}, 1000);
*/

/* 
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<div>
  <canvas id="myChart"></canvas>
</div>
*/