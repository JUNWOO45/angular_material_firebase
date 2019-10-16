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
      .subscribe((exercise: Exercise[]) => {
        console.log('exercise : ', exercise);
        this.availableExercises = exercise;
        this.exercisesChanged.next([...this.availableExercises]);
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
    // this.exercises.push({
    //   ...this.activatedExercise, 
    //   date: new Date(),
    //   state: 'completed'
    // });
    this.addDataToDatabase({
      ...this.activatedExercise, 
      date: new Date(),
      state: 'completed'
    });
    this.activatedExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // this.exercises.push({
    //   ...this.activatedExercise, 
    //   duration: this.activatedExercise.duration * (progress / 100),
    //   calories: this.activatedExercise.calories * (progress / 100),
    //   date: new Date(),
    //   state: 'cancelled'
    // });
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
    this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      // this.finishedExercises = exercises;
      this.finishedExercisesChanged.next(exercises);
    });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}