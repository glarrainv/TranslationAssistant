/** LOCAL VERSION **/
// Model Qwen3 4B smaller model
// User version: https://chat.qwen.ai/
// Runs with Ollama https://ollama.com/
// Older File works but it's not heavily commented
// Works very similarly but gets the response from localhost rather than an actual website
// localhost is a way to access requests made locally by your machine, so you do not need wifi
async function sendPrompt() {
  console.log("Sent Prompt");
  const promptDiv = document.getElementById("prompt");
  const responseDiv = document.getElementById("response");
  let prompt = promptDiv.value;
  let fullResponseText = "";
  let thinkingText = "**《思考》** \n";
  let stillThinking = true;
  promptDiv.setAttribute("readonly", true);
  promptDiv.style.backgroundColor = "#000";
  responseDiv.value = thinkingText;

  // Words

  const response = await fetch("Words.txt");
  let wordsfile = await response.text();

  // Extract non-commented lines
  const words = wordsfile
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("#") || !line || line == "")
    .join("\n");

  prompt = `\n${words}\n ${prompt}`;
  //Generate
  try {
    const res = await fetch("http://localhost:3001/api/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "fanyi:1",
        prompt: prompt,
        stream: true,
        think: true,
      }),
    });
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    if (!res.ok) {
      console.log(res);
      console.log("Failed");
    } else {
      console.log("Will estimate time in 30");
      setTimeout(() => {
        getWaitTime();
      }, 60000);
    }

    while (true) {
      const { value, done } = await reader.read();

      const chunk = decoder.decode(value, {
        stream: true,
      });

      if (done) {
        let blobdtMIME = new Blob([fullResponseText], { type: "text/plain" });
        let url = URL.createObjectURL(blobdtMIME);
        let anele = document.createElement("a");
        anele.setAttribute("download", "翻译文件");
        anele.href = url;
        anele.click();
        promptDiv.style.backgroundColor = "";
        console.log(chunk);
        promptDiv.removeAttribute("readonly");
        break;
      }
      const lines = chunk.split("\n");
      for (const line of lines) {
        try {
          const data = JSON.parse(line);

          if (data.response && data.response != "") {
            //Output response when possible
            stillThinking = false;
            fullResponseText += data.response;

            responseDiv.value = fullResponseText;
          } else if (data.thinking != "" && data.thinking && stillThinking) {
            //Output thinking if only output
            thinkingText += data.thinking;
            responseDiv.value = thinkingText;
          } else if (data.done) {
            break;
          }
        } catch (parseError) {
          console.log(parseError);
        }
      }
    }

    responseDiv.innerHTML = fullResponseText;
  } catch (error) {
    console.error("Error fetching Ollama response:", error);
    throw error;
  }
}

async function getWaitTime() {
  const statsDiv = document.getElementById("stats");
  const response = await fetch("http://localhost:3001/api/api/ps");
  const data = await response.json();

  const expiresAt = new Date(data.models[0].expires_at);
  const now = new Date();

  let waitTimeMs = expiresAt - now;

  if (Math.floor(waitTimeMs / 6000) > 0) {
    const minutes = Math.floor(waitTimeMs / 60000);
    statsDiv.innerHTML = minutes + " Minutes";
  } else {
    statsDiv.innerHTML = "写好了";
  }
}
