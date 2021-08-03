import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../shared/post';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-main-blog',
  templateUrl: './main-blog.component.html',
  styleUrls: ['./main-blog.component.css']
})
export class MainBlogComponent implements OnInit {

  Post: Post[];
  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit() {
    this.Post = this.restApi.getPostFromLocal();
    this.loadPostFromGNews();
    this.loadPostFromExternalAPI();
  }


  loadPostFromGNews() {
    return this.restApi.getPostsFromGNews().subscribe((data) => {
      this.Post.push.apply(this.Post, data.articles);
    })
  }

  loadPostFromExternalAPI() {
    return this.restApi.getPostFromExternalAPI().subscribe((data) => {
      this.Post = data;
    })
  }


  GoToDetail(item: Post) {

    if(item.type == "local") {
      this.router.navigate(['post-edit/'+ item.id]);
    }else {
      window.open(item.url, "_blank");

    }
  }


}
