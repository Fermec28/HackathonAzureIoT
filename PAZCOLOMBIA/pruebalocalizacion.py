import requests
url='http://ipinfo.io'
res= requests.get(url)
latitude,longitude= res.json()[u'loc'].split(",")
ciudad=res.json()[u'city']
print latitude +"---"+longitude+"----"+ciudad
