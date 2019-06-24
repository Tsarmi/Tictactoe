import { Component, OnInit } from '@angular/core';
import { StateService } from './../state.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  private _stateService: StateService;
 
  constructor(stateService: StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {
  }

  _handleResetClick() {
  	console.log('Click on Reset');
    // Asi es como se llama a una funcion que esta definida en los servicios
    this._stateService.reset();
    
  }


}
