from django.shortcuts import render


def view_bag(request):
    """
    A View that renders the bag content page
    """
    return render(request, 'bag/bag.html')