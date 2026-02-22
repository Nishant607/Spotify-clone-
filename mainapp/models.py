from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()


class Developer(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=200)
    image = models.ImageField(upload_to="developers/")

    def __str__(self):
        return self.name
