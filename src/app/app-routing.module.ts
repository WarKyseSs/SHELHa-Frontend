import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./pages/index/index.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {ForumComponent} from "./forum/forum.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {NgModule} from "@angular/core";
import {AboutComponent} from "./pages/about/about.component";
import {ContributorsComponent} from "./pages/about/contributors/contributors.component";
import {CommunityManagersComponent} from "./pages/about/community-managers/community-managers.component";
import {EventsComponent} from "./community/events/events.component";
import {ArticlesComponent} from "./community/articles/articles.component";
import {AdminComponent} from "./admin/admin.component";
import {ProfilComponent} from "./user/profil/profil.component";
import {SettingsComponent} from "./user/settings/settings.component";
import {PostsComponent} from "./forum/posts/posts.component";
import {PostCommentsComponent} from "./forum/posts/post-comments/post-comments.component";
import {EventDetailsComponent} from "./community/events/event-list/event-details/event-details.component";
import {ArticleDetailsComponent} from "./community/articles/article-list/article-details/article-details.component";
import {PostCreateComponent} from "./forum/posts/post-create/post-create.component";
import {ContainerCrudTopicComponent} from "./admin/container-crud-topic/container-crud-topic.component";
import {TopicsAdminCreateComponent} from "./admin/topics-admin/topics-admin-create/topics-admin-create.component";
import {TopicsAdminUpdateComponent} from "./admin/topics-admin/topics-admin-update/topics-admin-update.component";
import {TopicAdminDeleteComponent} from "./admin/topics-admin/topic-admin-delete/topic-admin-delete.component";
import {UsersAdminComponent} from "./admin/users-admin/users-admin.component";
import {ArticlesAdminComponent} from "./admin/articles-admin/articles-admin.component";
import {ArticleCreateComponent} from "./admin/articles-admin/article-create/article-create.component";
import {ArticleUpdateComponent} from "./admin/articles-admin/article-update/article-update.component";
import {ArticleDeleteComponent} from "./admin/articles-admin/article-delete/article-delete.component";
import {EventsAdminComponent} from "./admin/events-admin/events-admin.component";
import {EventCreateComponent} from "./admin/events-admin/event-create/event-create.component";
import {EventUpdateComponent} from "./admin/events-admin/event-update/event-update.component";
import {EventDeleteComponent} from "./admin/events-admin/event-delete/event-delete.component";
import {ConversationListComponent} from "./user/messaging/conversation-list/conversation-list.component";
import {MessagesListComponent} from "./user/messaging/messages-list/messages-list.component";
import {ForbiddenComponent} from "./pages/forbidden/forbidden.component";

const routes: Routes =
  [
    {
      path:'',redirectTo:'index', pathMatch: 'full'
    },
    {
      path:'index', component:IndexComponent
    },
    {
      path:'about',component: AboutComponent ,children:
        [
          {path: 'about/communityManagers', component: CommunityManagersComponent},
        ]
    },
    {
      path: 'about/contributors', component: ContributorsComponent
    },
    {
      path:'contact',component: ContactComponent
    },
    {
      path:'registration',component: SignUpComponent
    },
    {
      path:'connection',component: SignInComponent
    },
    {
      path:'forum',component:ForumComponent
    },
    {
      path:'forum/nouveaupost',component: PostCreateComponent
    },
    {
      path:'forum/:urlTopic',component: PostsComponent
    },
    {
      path:'forum/:urlTopic/:urlPost',component: PostCommentsComponent
    },
    {
      path:'events',component:EventsComponent
    },
    {
      path:'events/:urlEvent',component:EventDetailsComponent
    },
    {
      path:'articles',component:ArticlesComponent
    },
    {
      path:'articles/:urlArticle',component:ArticleDetailsComponent
    },
    {
      path:'admin',component:AdminComponent
    },
    {
      path: 'admin/users', component: UsersAdminComponent
    },
    {path: 'admin/crud', component: ContainerCrudTopicComponent,children:
        [
          {path: 'create', component: TopicsAdminCreateComponent},
          {path: 'update', component: TopicsAdminUpdateComponent},
          {path: 'delete', component: TopicAdminDeleteComponent},
        ]
    },
    {
      path:'admin/articles',component:ArticlesAdminComponent,children:
        [
          {path: 'create', component: ArticleCreateComponent},
          {path: 'update', component: ArticleUpdateComponent},
          {path: 'delete', component: ArticleDeleteComponent}
        ]
    },

    {
      path:'user/profil/:id',component:ProfilComponent
    },
    {
      path: 'admin/events', component: EventsAdminComponent, children:
        [
          {path: 'create', component: EventCreateComponent},
          {path: 'update', component: EventUpdateComponent},
          {path: 'delete', component: EventDeleteComponent}
        ]
    },
    {
      path:'user/conversation/list',component:ConversationListComponent
    },
    {
      path: 'user/conversation/list/:slug', component: MessagesListComponent
    },
    {
      path:'profil/:username',component:ProfilComponent
    },
    {
      path:'forbidden',component:ForbiddenComponent
    },
    {
      path:'settings',component:SettingsComponent
    },
    {
      path:'**', component: NotFoundComponent
    }
  ]
/* ask teacher why you put this there and not in app-module.ts */
@NgModule({
  imports:
    [
      RouterModule.forRoot(routes)
    ],
  exports:
    [
      RouterModule
    ]

})
export class AppRoutingModule { }
