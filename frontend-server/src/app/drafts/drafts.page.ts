import { Component, OnInit } from '@angular/core';

interface Teammate {
  username: string
}

interface Checker {
  username: string
}

interface Task {
  content: string
}

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.page.html',
  styleUrls: ['./drafts.page.scss'],
})
export class DraftsPage implements OnInit {
  // taskList: Task[] = [{ title: '' }]

  tasks: Task[] = []

  constructor() { }

  ngOnInit() {
    this.addTask()
  }

  addTask() {
    this.tasks.push({ content: '' })
  }

  get json() {
    return JSON.stringify(this, null, 2)
  }

}
