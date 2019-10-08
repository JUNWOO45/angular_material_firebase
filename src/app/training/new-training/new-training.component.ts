import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  trainingList : Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingList = this.trainingService.getExercises();
    console.log(this.trainingList)
  }

  trainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
