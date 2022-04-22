import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from '../_config/api.config';

@Component({
  selector: 'app-git',
  templateUrl: './git.page.html',
  styleUrls: ['./git.page.scss'],
})
export class GitPage implements OnInit {

  urlGitBack : string = API_CONFIG.gitUrlBackend;
  urlGitFront : string = API_CONFIG.gitUrlFrontend;

  constructor() { }

  ngOnInit() {
  }

}
