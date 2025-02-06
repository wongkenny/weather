import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'weather-details',
  templateUrl: './weatherDetails.component.html',
  styleUrls: ['./weatherDetails.component.scss']
})

export class WeatherDetails implements OnInit {
  constructor(private weatherService: WeatherService) {}
  city: string;
  noResults: boolean = false;
  weatherData: data | null = null;

  ngOnInit() {

  }

  searchWeather(): void {
    if (!this.city.trim()) return;

    this.weatherService.getWeather(this.city).subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          this.weatherData = response.data[0];
          this.noResults = false;
        } else {
          this.weatherData = null;
          this.noResults = true;
        }
      },
      error: (error) => {
        console.error('Error fetching weather:', error);
        this.weatherData = null;
        this.noResults = true;
      }
    });
  }

  getTemperature(): number {
    if (!this.weatherData?.weather) return 0;
    const tempMatch = this.weatherData.weather.match(/\d+/);
    return tempMatch ? parseInt(tempMatch[0]) : 0;
  }

}



interface data {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
  weather: string
  status: string[]
}