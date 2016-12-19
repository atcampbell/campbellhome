from .models import Work

# allows list of works to be loaded with index
def works(request):
    return {
        'works': Work.objects.all()
    }
