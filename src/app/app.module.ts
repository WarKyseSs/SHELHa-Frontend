import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ForumComponent } from './forum/forum.component';
import { CommunityComponent } from './community/community.component';
import { EventsComponent } from './community/events/events.component';
import { ArticlesComponent } from './community/articles/articles.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProfilComponent } from './user/profil/profil.component';
import { SettingsComponent } from './user/settings/settings.component';
import { NavbarComponent } from './pages/compenents/navbar/navbar.component';
import { FooterComponent } from './pages/compenents/footer/footer.component';
import { IndexComponent} from "./pages/index/index.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { ContributorsComponent } from './pages/about/contributors/contributors.component';
import { CommunityManagersComponent } from './pages/about/community-managers/community-managers.component';
import {AppRoutingModule} from "./app-routing.module";
import {TopicsComponent} from "./forum/topics/topics.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PostsComponent } from './forum/posts/posts.component';
import {PostCreateComponent} from "./forum/posts/post-create/post-create.component";
import {TopicsAdminCreateComponent} from "./admin/topics-admin/topics-admin-create/topics-admin-create.component";
import { PostCommentsComponent } from './forum/posts/post-comments/post-comments.component';
import { PostListComponent } from "./forum/posts/post-list/post-list.component";
import { CommentsComponent } from './forum/comments/comments.component';
import { CommentListComponent } from './forum/comments/comment-list/comment-list.component';
import { CommentCreateComponent } from './forum/comments/comment-create/comment-create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {UserCreateComponent} from "./pages/sign-up/user-create/user-create.component";
import { ArticleListComponent } from './community/articles/article-list/article-list.component';
import { EventListComponent } from './community/events/event-list/event-list.component';
import { EventDetailsComponent } from './community/events/event-list/event-details/event-details.component';
import { ArticleDetailsComponent } from './community/articles/article-list/article-details/article-details.component';
import {TopicsAdminUpdateComponent} from "./admin/topics-admin/topics-admin-update/topics-admin-update.component";
import { ArticlesAdminComponent } from './admin/articles-admin/articles-admin.component';
import {ArticleCreateComponent} from "./admin/articles-admin/article-create/article-create.component";
import {ArticleUpdateComponent} from "./admin/articles-admin/article-update/article-update.component";
import { ArticleDeleteComponent } from './admin/articles-admin/article-delete/article-delete.component';
import { EventsAdminComponent } from './admin/events-admin/events-admin.component';
import {EventCreateComponent} from "./admin/events-admin/event-create/event-create.component";
import { EventUpdateComponent } from './admin/events-admin/event-update/event-update.component';
import { EventDeleteComponent } from './admin/events-admin/event-delete/event-delete.component';
import { ContainerCrudTopicComponent } from './admin/container-crud-topic/container-crud-topic.component';
import { TopicAdminDeleteComponent } from './admin/topics-admin/topic-admin-delete/topic-admin-delete.component';
import {TopicsListComponent} from "./forum/topics/topics-list/topics-list.component";
import {UsersAdminComponent} from "./admin/users-admin/users-admin.component";
import {UsersAdminListComponent} from "./admin/users-admin/users-admin-list/users-admin-list.component";
import {UserUpdateComponent} from "./user/settings/user-update/user-update.component";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConversationListComponent} from "./user/messaging/conversation-list/conversation-list.component";
import { MessagesListComponent } from './user/messaging/messages-list/messages-list.component';
import {AuthInterceptor} from "./services/auth/auth.interceptor";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ForumComponent,
    CommunityComponent,
    EventsComponent,
    ArticlesComponent,
    ContactComponent,
    ProfilComponent,
    SettingsComponent,
    NavbarComponent,
    FooterComponent,
    TopicsComponent,
    IndexComponent,
    SignInComponent,
    SignUpComponent,
    NotFoundComponent,
    AboutComponent,
    ContributorsComponent,
    CommunityManagersComponent,
    TopicsComponent,
    PostsComponent,
    PostCreateComponent,
    TopicsAdminCreateComponent,
    PostCommentsComponent,
    PostListComponent,
    CommentsComponent,
    CommentListComponent,
    CommentCreateComponent,
    UserCreateComponent,
    SignUpComponent,
    ArticleCreateComponent,
    ArticleListComponent,
    ArticleUpdateComponent,
    EventCreateComponent,
    EventListComponent,
    EventUpdateComponent,
    EventDetailsComponent,
    ArticleDetailsComponent,
    TopicsAdminUpdateComponent,
    ContainerCrudTopicComponent,
    TopicAdminDeleteComponent,
    TopicsListComponent,
    TopicsListComponent,
    UsersAdminComponent,
    UsersAdminListComponent,
    UserUpdateComponent,
    ArticlesAdminComponent,
    ArticleDeleteComponent,
    EventsAdminComponent,
    EventDeleteComponent,
    TopicsAdminUpdateComponent,
    ConversationListComponent,
    MessagesListComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    Ng2SearchPipeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
