 import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, NgForm, NumberValueAccessor, Validators } from '@angular/forms';
import { ActivationEnd } from '@angular/router';
import { ComponentsResponse } from 'src/app/shared/interfaces/components';
import { ComponentsService } from 'src/app/shared/services/comments/comments.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private commentsService: ComponentsService,
    private formBuild: FormBuilder,
    private storsgeIcon: Storage

  ) { }

  public category: Array<ComponentsResponse> = [];
  public categoryForn!: FormGroup;
  public active_form = false;
  public edit_status = false;
  public uploadPercent!: number;
  private actionID = 0;
  public open = false

  ngOnInit(): void {
  this.initCategoryForm();
    this.getCategory();
  }

  initCategoryForm(): void {
    this.categoryForn = this.formBuild.group({
      titel: [null, Validators.required],
      link: [null, Validators.required],
      images: [null, Validators.required]
    })
  }


  getCategory(): void {
    this.commentsService.getAll().subscribe(data => {
      this.category = data
    })
  }


  creatCategory() {
    if (this.edit_status) {
      this.commentsService.editAction(this.categoryForn.value, this.actionID).subscribe(() => {
        this.getCategory();
      });
    }
    else {
      this.commentsService.addAction(this.categoryForn.value).subscribe(() => {
        this.getCategory();
      });
    }

    this.edit_status = false;
    this.active_form = false;
    this.categoryForn.reset();
  };


  editCategory(categ: ComponentsResponse) {
    this.categoryForn.patchValue({
      titel: categ.titel,
      link: categ.link,
      images: categ.images
    });
    this.active_form = true;
    this.edit_status = true;
    this.actionID = categ.id;

  };


  upload(actionImage: any): void {
 
    const file = actionImage.target.files[0]
    this.loadFIle('icon', file.name, file)
        .then(data => {
        if (this.uploadPercent == 100) {
          this.categoryForn.patchValue({
            images: data
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  async loadFIle(folder: string, name: string, file: File | null): Promise<string> {
    const pathIcon = `${folder}/${name}`
    let urlIcom = '';
    if (file) {
      try {
        const storageRef = ref(this.storsgeIcon, pathIcon);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress;
        })
        await task;
        urlIcom = await getDownloadURL(storageRef)


      } catch (e: any) {
        console.error(e)
      }

    } else {
      console.log('Wtong fike');

    }
    return Promise.resolve(urlIcom);
  }

  delCategory(index: ComponentsResponse) {
      const task = ref(this.storsgeIcon, index.images);
    deleteObject(task)
    this.commentsService.delAction(index.id).subscribe(() => {
      this.getCategory();
    });
  };


  deleteImage(): void {
    const task = ref(this.storsgeIcon, this.valueByControl('images'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.uploadPercent = 0;
      this.categoryForn.patchValue({
        images: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.categoryForn.get(control)?.value;
  }

}
 