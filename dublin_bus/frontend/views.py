import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Content

from datetime import datetime

# Create your views here.


def index(request):
    return render(request, 'index.html')


def get_content(request, email):
    data = Content.objects.filter(email=email).values(
        "id", "email", "content", "reply", 'creat_time', 'reply_time', 'reply_email')
    if data:
        data = list(data)
        # print(data)
        return JsonResponse(data, safe=False)
    else:
        #print("no data")
        return JsonResponse({"state": "not ok", "data": "", })


def get_all_content(request):
    data = Content.objects.all().values(
        "id", "email", "content", "reply", 'creat_time', 'reply_time', 'reply_email')
    if data:
        data = list(data)
        # print(data)
        return JsonResponse(data, safe=False)
    else:
        #print("no data")
        return JsonResponse({"state": "not ok", "data": "", })


@csrf_exempt
def add_content(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # print(data)
        # print(data['email'])
        one = Content()
        one.email = data['email']
        one.content = data['content']
        one.reply = data['reply']
        one.creat_time = datetime.now().strftime("%Y/%m/%d %H:%M")
        one.save()
        return JsonResponse({"state": "ok", "id": one.pk, 'creat_time': datetime.now().strftime("%Y/%m/%d %H:%M")})
    else:
        return JsonResponse({"state": "not ok"})


def delete_one(request, id):
    entry = Content.objects.filter(pk=id)
    if entry:
        entry.delete()
        return JsonResponse({"state": "ok"})
    else:
        return JsonResponse({"state": "not ok"})


@csrf_exempt
def update_one(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # print(data['id'])
        entry = Content.objects.filter(pk=data['id'])
        if entry:
            entry.update(
                reply=data['reply'], reply_email=data['reply_email'], reply_time=datetime.now().strftime("%Y/%m/%d %H:%M"))
            return JsonResponse({"state": "ok", 'reply_time': datetime.now().strftime("%Y/%m/%d %H:%M"), })
        else:
            return JsonResponse({"state": "not ok"})
    else:
        return JsonResponse({"state": "not ok"})
