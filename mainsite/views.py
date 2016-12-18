from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.template import RequestContext
from .models import Work, About, News, WorkImage
# TODO remove
import datetime

def work_list(request):
    works = Work.objects.order_by('title')
    return render(request, 'mainsite/work_list.html', {'works': works})

def index(request):
    works = Work.objects.order_by('title')
    return render(request, 'mainsite/index.html', {'works': works})

def ajax_test(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

def get_work_content(request):
    # slug = request.GET['workWanted']
    slug = request.GET.get('workWanted', '')
    try:
        # workWanted = Work.objects.get(slug=slug)
        # content = workWanted.content
        work = Work.objects.get(slug=slug)
        # images = work.work.all()
        images = WorkImage.objects.filter(work=work)
        # print('ball bumbo')
        # TODO dont even know why this works... something about context...
        # maybe change all to this if want pictures
        context = {'work': work, 'images': images}
        # print(context)
        content = render(request, 'mainsite/work_render.html', context_instance=RequestContext(request, context))
        return HttpResponse(content)
    except Work.DoesNotExist:
        todo = "return 404"
        return HttpResponse(todo)

def get_main_content(request):
    # get work requested
    slug = request.GET['contentWanted'];
    # remove whitespace from request
    slug = "".join(slug.split())
    # get appropriate content
    if slug == 'about':
        # about = About.objects.get(id=1)
        about = About.objects.get(title='About')
        # TODO use render() instead
        content = render_to_string('mainsite/about_render.html', {'about': about})
        return HttpResponse(content)
    if slug == 'news':
        news = News.objects.all()
        # render news template
        content = render_to_string('mainsite/news_render.html', {'news': news})
        return HttpResponse(content)
    if slug == 'work':
        works = Work.objects.all()
        context = {'works': works}
        content = render(request, 'mainsite/work_select_render.html', context_instance=RequestContext(request, context))
        return HttpResponse(content)
    if slug == 'name':
        content = render(request, 'mainsite/main_sketch.html')
        # content = render(request, 'mainsite/index.html')
        return HttpResponse(content)
    else:
        # is work requested valid?
        # if yes return content
        try:
            # workWanted = Work.objects.get(slug=slug)
            # content = workWanted.content
            work = Work.objects.get(slug=slug)
            images = WorkImage.objects.filter(work=work)
            context = {'work': work, 'images': images}
            # TODO dont even know why this works... something about context...
            # maybe change all to this if want pictures
            # context = {'work': work}
            content = render(request, 'mainsite/work_render.html', context_instance=RequestContext(request, context))
            return HttpResponse(content)
        except Work.DoesNotExist:
            todo = "return 404"
            return HttpResponse(todo)
