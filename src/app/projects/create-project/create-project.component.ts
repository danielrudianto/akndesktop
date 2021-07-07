import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generalProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required)
  })

  clientFormGroup: FormGroup = new FormGroup({
    id: new FormControl(null, Validators.required)
  })

}
