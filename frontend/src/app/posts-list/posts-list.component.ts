import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post';
import { RestApiService } from "../shared/rest-api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  Post: Post[];

  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadPosts()
  }

  // Get posts list
  loadPosts() {
    this.Post = this.restApi.getPostFromLocal();
  }

  // Delete post
  deletePost(id: number) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deletePost(id);
      this.loadPosts();
    }
  }

  GoToEditPost(id: number) {
    ///post-edit/{{post.id}}
    this.router.navigate(['post-edit/'+ id]);
  }

  newPost() {
    ///create-post
    this.router.navigate(['create-post']);
  }

}
