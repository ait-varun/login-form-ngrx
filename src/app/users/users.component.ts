
import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
 data: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getData().subscribe(
      (response) => {
        // Handle the response from the API
        this.data = response;
      },
      (error) => {
        // Handle errors here if needed
      }
    );
  }
}
