import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-fetching',
  templateUrl: './fetching.component.html',
  styleUrl: './fetching.component.css'
})
export class FetchingComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data.users; // Ajusta según la estructura de la respuesta
    });
  }
}
