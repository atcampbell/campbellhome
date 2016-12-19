from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^get_main_content/', views.get_main_content, name='get_main_content'),
]
