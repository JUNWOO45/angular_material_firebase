import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() startedTraining = new EventEmitter();
  trainingList : Exercise[] = [];

  constructor(private trainingService: TrainingService) { 
    

    
  }

  ngOnInit() {
    this.trainingList = this.trainingService.getExercises();
    console.log(this.trainingList)
  }

  trainingStart() {
    this.startedTraining.emit();
  }
}
