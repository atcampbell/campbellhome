from django.db import models
from django.utils import timezone
from django.template.defaultfilters import slugify

class Work(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    slug = models.SlugField()
    # upload cover image to media folder
    # TODO this is is root directory, should be in mainsite directory with static
    # coverImage = models.ImageField(upload_to='images/')
    # coverImage = models.FileField(upload_to='new/')
    coverImage = models.FileField(upload_to='images/')

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Work, self).save(*args, *kwargs)

    def publish(self):
        self.save()

    def __str__(self):
        return self.title

class WorkImage(models.Model):
    work = models.ForeignKey(Work, related_name='images')
    # TODO change to its own folder or a folder for each work
    # image = models.FileField(upload_to='new/')
    image = models.FileField(upload_to='images/')

    def save(self, *args, **kwargs):
        super(WorkImage, self).save(*args, *kwargs)

    def __str__(self):
        return str(self.id)

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    def publish(self):
        self.save()

    def __str__(self):
        return self.title

class About(models.Model):
    title=models.CharField(max_length=200)
    content = models.TextField()

    def __str__(self):
        return self.title
