from django.shortcuts import render, redirect
from django.http import HttpResponse
from mainapp.models import Contact


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