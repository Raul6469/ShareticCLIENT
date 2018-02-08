import { Component, OnInit } from '@angular/core';
import { Chapter} from '../../entities/chapter';
import {FormationService} from '../../services/formation.service';
import {Formation} from '../../entities/formation';
import {Location} from '@angular/common';
import {ChapterService} from '../../services/chapter.service';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {

  /**
   * List of formation's chapters .
   */
  chapters: Chapter []= [];

  /**
   * Empty chapter, id is set to -1 until it is saved and given an id by the server.
   */
  emptyChapter: Chapter = {
    id: -1,
    title: 'Chapitre',
    place: 0,
    description: '',
    content: '',
    rating: 0
  };

  /**
   * Empty formation, id is set to -1 until it is saved and given an id by the server.
   */
  formation: Formation = {
    id: -1,
    name: '',
    icon: '',
    description: '',
  };

  /**
   * List of item, available to the user to make a formation.
   */
  items = [
    this.emptyChapter
  ];

  constructor( private formationService: FormationService, private chapterService: ChapterService,
               private location: Location) { }

  ngOnInit() {
  }

  onChapterDrop(e: any) {
    const newChapter: Chapter = e.dragData;
    this.chapters.push(newChapter);
  }

  /**
   * Save the formation on the server, the 1st time the formation is saved, all chapters are saved too.
   * The following times, the formation is updated and only new chapters are added.
   */
  saveFormation() {
    if (this.formation.id === -1) {
      this.formationService.addFormation(this.formation).subscribe(f =>  {
          this.formation = f;
          for (const chapter of this.chapters) {
            this.chapterService.addChapter(chapter, f.id).subscribe( c => {
              this.chapters[this.chapters.indexOf(chapter)] = c;
            });
          }
        });
    } else {
      this.formationService.updateFormation(this.formation).subscribe(f => {
        this.formation = f;
        for (const chapter of this.chapters) {
          if (chapter.id === -1) {
            this.chapterService.addChapter(chapter, f.id).subscribe( c => {
              this.chapters[this.chapters.indexOf(chapter)] = c;
            });
          }
        }
      });
    }
  }

  deleteChapter(chapter: Chapter) {
    this.chapters.splice(this.chapters.indexOf(chapter), 1);
  }

  goBack(): void {
    this.location.back();
  }
}
