@echo true
TASKKILL /F /IM Ollama.exe
start cmd /k node gongju/server.js
start cmd /k node gongju/JS/proxy.js

start http://localhost:5500/lixiang.html

cd "./gongju/ollama"
setlocal

set OLLAMA_KEEP_ALIVE=10m

ollama serve
