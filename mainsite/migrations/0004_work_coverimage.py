# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-12-09 15:55
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('mainsite', '0003_work_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='work',
            name='coverImage',
            field=models.ImageField(default=datetime.datetime(2016, 12, 9, 15, 55, 10, 941811, tzinfo=utc), upload_to='images/'),
            preserve_default=False,
        ),
    ]