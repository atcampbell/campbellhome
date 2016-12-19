from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.template import RequestContext
from .models import Work, About, News, WorkImage
import datetime

# load index page
def index(request):
    return render(request, 'mainsite/index.html')

#  get the main page content and place in div - ajax
def get_main_content(request):
    # get work requested
    slug = request.GET['contentWanted'];
    # remove whitespace from request
    slug = "".join(slug.split())
    # get appropriate content
    if slug == 'about':
        about = About.objects.get(title='About')
        content = render_to_string('mainsite/about_render.html', {'about': about})
        return HttpResponse(content)
    if slug == 'news':
        news = News.objects.all()
        content = render_to_string('mainsite/news_render.html', {'news': news})
        return HttpResponse(content)
    if slug == 'work':
        works = Work.objects.all()
        context = {'works': works}
        content = render(request, 'mainsite/work_select_render.html', context)
        # content = render(request, 'mainsite/work_select_render.html', context_instance=RequestContext(request, context))
        return HttpResponse(content)
    if slug == 'name':
        content = render(request, 'mainsite/main_sketch.html')
        return HttpResponse(content)
    else:
        # is work requested valid?
        # if yes return content
        try:
            # get work wanted
            work = Work.objects.get(slug=slug)
            # get images for work
            images = WorkImage.objects.filter(work=work)
            context = {'work': work, 'images': images}
            content = render(request, 'mainsite/work_render.html', context)
            # content = render(request, 'mainsite/work_render.html', context_instance=RequestContext(request, context))
            return HttpResponse(content)
        except Work.DoesNotExist:
            # TODO error handling
            todo = "return error"
            return HttpResponse(todo)
