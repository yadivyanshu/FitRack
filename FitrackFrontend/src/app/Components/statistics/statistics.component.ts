import { Component, OnInit } from '@angular/core';  
import { StatisticsService } from '../../services/statistics.service';  
import { Statistics } from '../../services/statistics';  
import { Chart, registerables } from 'chart.js';  
  
@Component({  
  selector: 'app-statistics',  
  templateUrl: './statistics.component.html',  
  styleUrls: ['./statistics.component.css']  
})  
export class StatisticsComponent implements OnInit {  
  statistics: Statistics[] = [];  
  userId: any;  
  searchId: any;  
  chart: any;  
  
  constructor(private statisticsService: StatisticsService) { }  
  
  ngOnInit(): void {  
 this.loadStatistics(this.userId);  
  }  
  
  loadStatistics(userId: number): void {  
 this.statisticsService.getStatisticsByUserId(userId).subscribe(  
  data => {  
  this.statistics = data;  
  console.log('Statistics loaded:', this.statistics); 
   this.createChart();  
  },  
  error => console.error('Error fetching statistics', error)  
  );  
  }  
  

  onSearch(): void {  
  if (this.searchId) {  
  this.loadStatistics(this.searchId);  
  }  
  }  
  
  createChart(): void {  
    const ctx = document.getElementById('chart') as HTMLCanvasElement;

 if (this.chart) {  
 this.chart.destroy();  
 }  
  this.chart = new Chart(ctx, {  
  type: 'bar',  
  data: {  
  labels: this.statistics.map(stat => stat.gamesPlayed),  
  datasets: [{  
  label: 'Points Scored',  
  data: this.statistics.map(stat => stat.pointsScored),  
  backgroundColor: 'rgba(255, 99, 132, 0.2)',  
  borderColor: 'rgba(255, 99, 132, 1)',  
  borderWidth: 1  
  },  
  {  
  label: 'Assists',  
  data: this.statistics.map(stat => stat.assists),  
  backgroundColor: 'rgba(54, 162, 235, 0.2)',  
  borderColor: 'rgba(54, 162, 235, 1)',  
  borderWidth: 1  
  },  
      {  
      label: 'Rebounds',  
      data: this.statistics.map(stat => stat.rebounds),  
      backgroundColor: 'rgba(255, 206, 86, 0.2)',  
      borderColor: 'rgba(255, 206, 86, 1)',  
      borderWidth: 1  
     }]  
   },  
   options: {  
   scales: {  
     y: {  
      beginAtZero: true  
    }  
   }  
  }  
 });  
  }  
}
