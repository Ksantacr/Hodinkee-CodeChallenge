import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Post } from './post';
import { GNewsResponse } from './GNewsResponse';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  apiURL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API get() method => Fetch posts list
  getPostFromLocal(): Post[] {


    const postLocal = localStorage.getItem('post');
    let postList:Post[] = [];

    if(postLocal){
      postList = JSON.parse(postLocal);
    }

    return postList;

  }

  getPostsFromGNews(): Observable<GNewsResponse> {
    return this.http.get<GNewsResponse>('https://gnews.io/api/v4/search?q=example&token=ca6e7d410e40eaaffe762e8e434203da&lang=en&max=10')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getPostFromExternalAPI(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL + '/api/posts')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }


  // HttpClient API get() method => Fetch post
  getPost(id: number): Post {

    const postLocal = localStorage.getItem('post');
    let postList:Post[] = [];

    if(postLocal){
      postList = JSON.parse(postLocal);
    }
    return postList[postList.findIndex(d => d.id === id)];

  }

  // HttpClient API post() method => Create post
  createPostLocal(post: Post): Post {

    let id = 0;
    const postLocal = localStorage.getItem('post');
    let postList:Post[] = [];

    if(postLocal){
      postList = JSON.parse(postLocal);

      if(postList.length == 0) {
        id = 1;
      } else{
        id = postList.slice(-1).pop().id + 1;
      }
    }else {
      id = 1;
    }

    post.id = id;
    postList.push(post);

    const jsonData = JSON.stringify(postList);
    localStorage.setItem('post', jsonData);

    return post;

  }

  // HttpClient API put() method => Update post
  updatePost(id:number, postNew:Post): Post {

    const postLocal = localStorage.getItem('post');
    let postList:Post[] = [];

    if(postLocal){
      postList = JSON.parse(postLocal);
    }

    postList[postList.findIndex(d => d.id === id)] = postNew;
    const jsonData = JSON.stringify(postList)
    localStorage.setItem('post', jsonData)
    return postNew;

  }

  // HttpClient API delete() method => Delete post
  deletePost(id:number) {

    const postLocal = localStorage.getItem('post');
    let postList:Post[] = [];

    if(postLocal){
      postList = JSON.parse(postLocal);
    }

    let index = postList.findIndex(d => d.id === id); //find index in your array
    postList.splice(index, 1);//remove element from array

    const jsonData = JSON.stringify(postList);
    localStorage.setItem('post', jsonData);
  }

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     //window.alert(errorMessage);
     return throwError(errorMessage);
  }

}
