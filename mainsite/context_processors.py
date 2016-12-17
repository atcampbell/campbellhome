from .models import Work

def works(request):
    return {
        'works': Work.objects.all()
    }
