import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];

  activatedExercise: Exercise;
  private finishedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {

  }
  fetchExercises() {
    this.db
      .collection('availableExercises')
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
      .subscribe((exercise: Exercise[]) => {
        console.log('exercise : ', exercise);
        this.availableExercises = exercise;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        // console.log('error : ', error);
      })
  }

  startExercise(selectedId) {
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.activatedExercise = this.availableExercises.find(exercise => {
      return exercise.id === selectedId;
    });
    this.exerciseChanged.next({...this.activatedExercise})
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.activatedExercise, 
      date: new Date(),
      state: 'completed'
    });
    this.activatedExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.activatedExercise, 
      duration: this.activatedExercise.duration * (progress / 100),
      calories: this.activatedExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.activatedExercise = null;
    this.exerciseChanged.next(null);
  }

  getActivatedExercise() {
    return { ...this.activatedExercise };
  }

  fetchCompletedOrCancelledExercise() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }, error => {
        // console.log('error : ', error);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}