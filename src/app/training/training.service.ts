import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];

  activatedExercise: Exercise;
  private exercises: Exercise[] = [];

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
        this.availableExercises = exercise;
        this.exercisesChanged.next([...this.availableExercises]);
      })
  }

  startExercise(selectedId) {
    this.activatedExercise = this.availableExercises.find(exercise => {
      return exercise.id === selectedId;
    });
    this.exerciseChanged.next({...this.activatedExercise})
  }

  completeExercise() {
    this.exercises.push({
      ...this.activatedExercise, 
      date: new Date(),
      state: 'completed'
    });
    this.activatedExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
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

  getCompletedOrCancelledExercise() {
    return this.exercises.slice();
  }
}