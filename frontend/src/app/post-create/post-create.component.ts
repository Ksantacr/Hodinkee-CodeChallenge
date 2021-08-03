import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../shared/post';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  @Input() postDetails: Post = { id: 0, title: '', content: '', image: '', type: 'local' };
  isUploaded = false;
  ImageBaseData:string | ArrayBuffer=null;

  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit() { }

  addPost() {

    this.restApi.createPostLocal(this.postDetails);
    this.router.navigate(['/post-list']);

  }

  handleFileInput(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.ImageBaseData=reader.result;
      me.postDetails.image = me.ImageBaseData.toString();
      me.isUploaded = true;
    };
    reader.onerror = function (error) {
      me.isUploaded = false;
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
      me.postDetails.image = me.ImageBaseData.toString();
      me.isUploaded = true;
    };
    reader.onerror = function (error) {
      me.isUploaded = false;
    };
    }
  }

}
