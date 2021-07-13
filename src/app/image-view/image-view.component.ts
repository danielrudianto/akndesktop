import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  @Input() imageUrl: string;
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }

  doNothing() {}
}
