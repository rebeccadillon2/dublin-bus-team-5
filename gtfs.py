import urllib.request, json

try:
    url = "https://api.nationaltransport.ie/gtfsr/v1?format=json"

    hdr ={
    # Request headers
    'Cache-Control': 'no-cache',
    'x-api-key': '4f3377c92c6d414d90bfdff247be0cc9',
    }

    req = urllib.request.Request(url, headers=hdr)

    req.get_method = lambda: 'GET'
    response = urllib.request.urlopen(req)
    print(response.getcode())
    print(response.read())
except Exception as e:
    print(e)
