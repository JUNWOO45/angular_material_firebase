import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'soccer', name: 'Soccer', duration: 180, calories: 120 },
    { id: 'marathon', name: 'Marathon', duration: 240, calories: 200 },
    { id: 'swimming', name: 'Swimming', duration: 80, calories: 110 },
    { id: 'climing', name: 'Climing', duration: 60, calories: 80 }
  ];

  activatedExercise: Exercise;
  private exercises: Exercise[] = [];

  getExercises() {
    return this.availableExercises.slice();
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
}