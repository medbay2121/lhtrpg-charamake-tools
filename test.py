# test.py
import json
import urllib.request

def fetch_json(url):
    with urllib.request.urlopen(url) as response:
        return response.read().decode()

def process_json(input_json):
    data = json.loads(input_json)
    return json.dumps(data, indent=4)

# main()関数をコメントアウトしておきます
# main()
