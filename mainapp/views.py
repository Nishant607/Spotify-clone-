from django.shortcuts import render, redirect
from django.http import HttpResponse
from mainapp.models import Contact
from django.contrib.auth.models import User
from django.contrib import messages


def home(request):
    return render(request, "index.html", {"page_class": "home"})


from mainapp.models import Developer

def about(request):
    developer = Developer.objects.first()
    return render(request, "about.html", {
        "page_class": "about",
        "developer": developer
    })


def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        Contact.objects.create(
            name=name,
            email=email,
            message=message
        )

        return redirect("contact")

    return render(request, "contact.html", {"page_class": "contact"})


def signup_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username = username).exists():
          return render(request, 'signup.html', {  
             "page_class": "signup",
             "error": "Username already exists"
          })
        # create user
        user = User.objects.create_user(
            username= username,
            email=email,
            password=password
        )
        return render(request,'signup')
    return render(request,'signup.html',{
        'page_class': 'signup'
    })