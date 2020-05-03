import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Folder } from 'src/app/models/node';
import * as _ from 'lodash';
import { FolderService } from 'src/app/services/node.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [MessageService]
})
export class ProjectComponent implements OnInit {

  loadingFolder$: Observable<boolean>;
  folders$: Observable<Folder[]>;
  folders: Folder[];

  value: string;

  constructor(
    private folderService: FolderService,
    private messageService: MessageService
  ) {
    // Folder
    this.folders$ = this.folderService.entities$;
    this.loadingFolder$ = this.folderService.loading$;
    this.folders$.subscribe(
      (folders: Folder[]) => {
        this.folders = _.map(folders, (folder) => {
          return {
            id: folder.id,
            name: folder.name,
            entity: folder
          };
        });
      });
  }

  ngOnInit(): void {
    this.folderService.getAll();
  }

  addFolder(event: any) {
    this.folderService.add({
      id: undefined,
      name: this.value
    }).subscribe(
      (updated) => {
        this.messageService.add({ severity: 'success', summary: 'New project', detail: `${updated.name}` });
      }
    );
  }

}
