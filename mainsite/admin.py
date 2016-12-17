from django.contrib import admin
from .models import News, Work, About, WorkImage

admin.site.register(Work)
admin.site.register(WorkImage)
admin.site.register(News)
admin.site.register(About)
