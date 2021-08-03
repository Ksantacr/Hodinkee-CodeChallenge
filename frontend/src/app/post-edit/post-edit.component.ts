import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../shared/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})

export class PostEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  public postData: Post = null;

  isNewImageUploaded = false;
  ImageBaseData:string | ArrayBuffer=null;
  isLoading = true;

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit() {

    this.postData = this.restApi.getPost(parseInt(this.id));
    this.isLoading = false;
  }

  // Update post data
  updatePost() {

    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updatePost(parseInt(this.id), this.postData);
      this.router.navigate(['/post-list']);
    }
  }

  handleFileInput(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.ImageBaseData=reader.result;
      me.postData.image = me.ImageBaseData.toString();
      me.isNewImageUploaded = true;
    };
    reader.onerror = function (error) {
      me.isNewImageUploaded = false;
    };
   }

   onFileSelected() {

    let me = this;
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.readAsDataURL(inputNode.files[0]);
      reader.onload = function () {
        me.ImageBaseData=reader.result;
        me.postData.image = me.ImageBaseData.toString();
        me.isNewImageUploaded = true;
      };
      reader.onerror = function (error) {
        me.isNewImageUploaded = false;
      };
    }
  }

  GoToList() {
    this.router.navigate(['/post-list']);
  }

}
