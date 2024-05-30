const topuser = document.getElementById('topuser');
var data_column = JSON.parse(document.querySelectorAll('input')[0].getAttribute('data_column'));
const newfriend = document.getElementById('newfriend');
var data_line = JSON.parse(document.querySelectorAll('input')[1].getAttribute('data_line'));
// console.log(data_column);
// console.log(data_line);
new Chart('newfriend', {
    type: 'line',
    data: {
        labels: data_line.month,
        datasets: [{
            label: 'New Friend Per Month',
            data: data_line.count,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(140, 92, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(100, 149, 237, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)',
                'rgb(201, 203, 207)',
                'rgb(140, 92, 235)',
                'rgb(255, 99, 132)',
                'rgb(100, 149, 237)'
            ],
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'New Friend Per Month'
            }
        },
        elements: {
            point: {
                radius: 5
            }
        }
    }
});

new Chart('topuser', {
    type: 'bar',
    data: {
        labels: data_column.name,
        datasets: [{
            label: 'Top 5 User Interaction',
            data: data_column.react,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ]
            ,
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        xAxis: {
            title: {
                display: true,
                text: 'Tên Cột X'
            }
        }
    }
});
