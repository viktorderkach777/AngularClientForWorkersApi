import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { WorkersService } from '../workers.service';
import { Worker } from '../worker';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  dataSaved = false;
  workerForm: any;
  allWorkers: Observable<Worker[]>;
  workerIdUpdate = null;
  message = null;

  constructor(private formbulider: FormBuilder, private wS: WorkersService) { }

  ngOnInit() {
    this.workerForm = this.formbulider.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Salary: ['', [Validators.required]],
    });
    this.loadAllWorkers();
  }

  loadAllWorkers() {
    this.allWorkers = this.wS.getAllWorkers();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const worker = this.workerForm.value;
    this.CreateWorker(worker);
    this.workerForm.reset();
  }

  CreateWorker(worker: Worker) {
    if (this.workerIdUpdate == null) {
      this.wS.createWorker(worker).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved Successfully';
          this.loadAllWorkers();
          this.workerIdUpdate = null;
          this.workerForm.reset();
        }
      );
    } else {
      worker.Id = this.workerIdUpdate;
      this.wS.updateWorker(worker).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.loadAllWorkers();
        this.workerIdUpdate = null;
        this.workerForm.reset();
      });
    }
  }

  deleteWorker(workerId: string) {
    if (confirm('Are you sure you want to delete this ?')) {
      this.wS.deleteWorkerById(workerId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Deleted Succefully';
        this.loadAllWorkers();
        this.workerIdUpdate = null;
        this.workerForm.reset();
      });
    }
  }

  loadWorkerToEdit(workerId: string) {
    this.wS.getWorkerById(workerId).subscribe( w => {
      this.message = null;
      this.dataSaved = false;
      this.workerIdUpdate = w.Id;

      this.workerForm.controls.FirstName.setValue(w.FirstName);
      this.workerForm.controls.LastName.setValue(w.LastName);
      this.workerForm.controls.Age.setValue(w.Age);
      this.workerForm.controls.Salary.setValue(w.Salary);
    });
  }

  resetForm() {
    this.workerForm.reset();
    this.message = null;
    this.dataSaved = false;
  }


}