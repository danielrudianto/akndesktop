import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  Position: number = 0;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.Position = this.authService.getInfo().Position;
  }

}
