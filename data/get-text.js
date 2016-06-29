/**
 * Created by Administrator on 2016/6/29.
 */
var textArea = document.getElementById("edit-box");

textArea.addEventListener("keyup",function onkeyup(e){
    if(e.keyCode == 13){
        text = textArea.value.replace(/(\r\n|\n|\r)/gm,"");
        self.port.emit("text-entered",text);
        textArea.value = "";
    }
},false);

self.port.on("show",function onShow(){
    textArea.focus();
});