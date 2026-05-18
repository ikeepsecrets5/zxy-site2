
function openVerify(){
 document.getElementById('verifyModal').style.display='flex';
}
function closeVerify(){
 document.getElementById('verifyModal').style.display='none';
}
function fakeVerify(){
 const key=document.getElementById('verifyKey').value;
 const result=document.getElementById('verifyResult');

 if(key.length < 10){
   result.innerHTML='❌ Key inválida';
   return;
 }

 result.innerHTML='✅ Key aceita! (preview visual)';
}

function addBot(){
 window.open('https://discord.com/oauth2/authorize?client_id=SEU_CLIENT_ID&scope=bot+applications.commands&permissions=8','_blank');
}

function joinDiscord(){
 window.open('https://discord.gg/SEUINVITE','_blank');
}
