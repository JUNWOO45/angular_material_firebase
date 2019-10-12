import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit {
  // myDataArray = [
  //   {name: 'junwoo', age: 20, live: 'dongtan'},
  //   {name: 'gaon', age: 10, live: 'dongtan'},
  //   {name: 'yeoul', age: 1, live: 'dongtan'}
  // ]
    
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercise();
  }

}
