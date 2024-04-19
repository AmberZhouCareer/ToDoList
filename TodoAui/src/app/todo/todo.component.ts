import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../models/todo';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { inject, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  public loading: boolean = false;
  todoValue: string = '';
  todoList: Todo[] = [];
  finishedList: Todo[] = [];

  closeResult = '';

  constructor(
    private todoService: TodoService,
    private modalService: NgbModal
  ){ }

  ngOnInit(): void {
    this.getTodos();
  }

  public getTodos(): void {
    this.getActive();
    this.getDone();
  }

  public getActive(): void {
    this.loading = true;
    setTimeout(() => {
      this.todoService.retrieveActive().subscribe((items: Todo[]) => {
        this.loading = false;
        this.todoList = items;
      }, (error: any) => {
        this.loading = false;
        console.log(error);
      });
    }, 2000);
  }

  public getDone(): void {
    this.loading = true;
    setTimeout(() => {
      this.todoService.retrieveDone().subscribe(items => {
        this.loading = false;
        this.finishedList = items;
      }, (error) => {
        this.loading = false;
        console.log(error);
      });
    }, 2000);
  }

  public addTodo() {
    let todo = new Todo();
    todo.id = 0;
    todo.title = this.todoValue;
    todo.completed = false;
    console.log(todo);
    this.todoService.create(todo).subscribe();
    this.getActive();
    this.todoValue = '';
  }

  public changeTodo(id: number) {
    const item = this.todoList.splice(id, 1);
    console.log(item);
    let todo = item[0];
    todo.completed = true;
    this.todoService.update(todo).subscribe();
    this.finishedList.push(todo);
  }

  public changeFinished(id: number) {
    const item = this.finishedList.splice(id, 1);
    console.log(item);
    let todo = item[0];
    todo.completed = false;
    this.todoService.update(todo).subscribe();
    this.todoList.push(todo);
  }

  public openModal(content: TemplateRef<Element>, id: number, type: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        if (result == 'OK') {
          if (type == 'todoList') {
            const item = this.todoList.splice(id, 1);
            let todo = item[0];
            this.todoService.delete(todo.id).subscribe();
          }
          else {
            const item = this.finishedList.splice(id, 1);
            let todo = item[0];
            this.todoService.delete(todo.id).subscribe();
          }
        }
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
  }

	public openDialog(content: TemplateRef<any>) {
    this.todoValue = '';
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        console.log(`Closed with: ${result}`);
        console.log(`todoValue is: ${this.todoValue}`)
				this.closeResult = `Closed with: ${result}`;
        if (result == 'OK' && this.todoValue != '')
        {
          console.log('calling addTodo()');
          this.addTodo();
        }
			},
			(reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`)
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
