from django.http import JsonResponse
   from channels.generic.websocket import AsyncWebsocketConsumer
   import json
   from .chatbot_logic import search, df, index

   class ChatConsumer(AsyncWebsocketConsumer):
       async def connect(self):
           await self.accept()

       async def disconnect(self, close_code):
           pass

       async def receive(self, text_data):
           text_data_json = json.loads(text_data)
           query = text_data_json['message']

           results = search(query, df, index)

           await self.send(text_data=json.dumps({
               'message': results
           }))

   def search_view(request):
       query = request.GET.get('query', '')
       results = search(query, df, index)
       return JsonResponse({'results': results})