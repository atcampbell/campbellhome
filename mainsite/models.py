from django.db import models
from django.utils import timezone
from django.template.defaultfilters import slugify

# information for a single work
class Work(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    slug = models.SlugField()
    # upload cover image to media folder
    coverImage = models.FileField(upload_to='images/')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Work, self).save(*args, **kwargs)

    def publish(self):
        self.save()

    def __str__(self):
        return self.title

# images used in work posts
class WorkImage(models.Model):
    # the work the image relates to
    work = models.ForeignKey(Work, related_name='images')
    image = models.FileField(upload_to='images/')

    def save(self, *args, **kwargs):
        super(WorkImage, self).save(*args, *kwargs)

    def __str__(self):
        return str(self.id)

#  news items
class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.save()

    def __str__(self):
        return self.title

# about page
class About(models.Model):
    title=models.CharField(max_length=200)
    content = models.TextField()

    def __str__(self):
        return self.title
