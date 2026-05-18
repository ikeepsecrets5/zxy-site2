
document.querySelectorAll('.card,.stat').forEach((el)=>{
  el.addEventListener('mousemove',(e)=>{
    const r=el.getBoundingClientRect();
    el.style.transform=`translateY(-6px) rotateX(${-(e.clientY-r.top-r.height/2)/35}deg) rotateY(${(e.clientX-r.left-r.width/2)/35}deg)`;
  });
  el.addEventListener('mouseleave',()=>{el.style.transform='';});
});
