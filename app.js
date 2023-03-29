const { app, BrowserWindow } = require('electron')
const path = require('path')
const { Configuration, OpenAIApi } = require("openai");
const { type } = require('os');

//input
function input_main(){
    if (typeof document !== "undefined"){
        var frage = document.getElementById("input_frage").value;
                
        //api
        const configuration = new Configuration({
            apiKey: "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",
        });

        const openai = new OpenAIApi(configuration);

        const main = async () => {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: frage,
                temperature: 0,
                max_tokens: 100,
                top_p: 1.0,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
                stop: ["You:"],
            });

            var all = response;
            var antwort_text = all.data.choices;
        }

        main();

        document.getElementById("antwort").innerHTML = "test";
    }
}

//app
function createWindow () {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('app.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
