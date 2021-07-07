import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  @Input() email: string = "";
  pageNumber: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  openAddPosition() {

  }

}
