from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    # do i need that trailing /?
    url(r'^ajax_test/', views.ajax_test, name='ajax_test'),
    url(r'^get_main_content/', views.get_main_content, name='get_main_content'),
    url(r'^get_work_content/', views.get_work_content, name='get_work_content'),
    # url(r'^news_render/', views.news_render, name='news_render'),
]
