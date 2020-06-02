import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeForm: FormGroup;
  featuresData: any;
  constructor(private fb: FormBuilder, private utilService: UtilService) {
    this.featuresData = [];
  }

  ngOnInit(): void {
    this.homeForm = this.fb.group({
      inputIP: ['192.168.1.1'],
      mod: ['mod1'],
      num: [''],
      ver: ['0.1'],
      lang: ['english'],
      features: this.fb.array([])
    });
    // disable the fields
    this.homeForm.get('inputIP').disable();
    this.homeForm.get('ver').disable();
    this.getData();
  }
  getData(): void {
    // do api call via service
    this.utilService.getData()
      .subscribe( (resp: any) => {
        this.homeForm.patchValue(resp[0]);
        //
        this.featuresData = resp[0].features;
        this.addFeatures();
      }, error => {
        console.log(error);
      });
  }

  addFeatures(): void {
    this.featuresData.forEach( (data, i) => {
      const control = new FormControl();
      (this.homeForm.get('features') as FormArray).push(control);
    });
  }

  submitForm() {
    // api call to push data (this.homeForm.value)
    this.utilService.postData(this.homeForm.value)
      .subscribe( result => {
        console.log('data updated successfully');
      }, error => {
        console.log('some error occured', error);
      });
  }
}
