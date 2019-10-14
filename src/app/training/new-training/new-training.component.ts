import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // trainingList : Exercise[] = [];
  trainingList: Observable<any>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    // this.trainingList = this.trainingService.getExercises();  //firebase에서 DB만들면서 삭제
    this.trainingList = this.db
      .collection('availableExercises')
      // .valueChanges();
      .snapshotChanges()
      .pipe(map(docData => {
        return docData.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      }))
  }

  trainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
