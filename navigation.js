function mountFloatingNavigation(nav){
 const buttons=[...nav.querySelectorAll('[data-view]')],slider=nav.querySelector('.nav-slider'),reduced=matchMedia('(prefers-reduced-motion: reduce)');let current=0;
 function move(instant=false){slider.toggleAttribute('data-instant',instant||reduced.matches);slider.style.transform='translateX('+(current*(nav.clientWidth-14)/buttons.length)+'px)'}
 function select(index,{focus=false,write=true,scroll=true}={}){
 current=index;buttons.forEach((button,i)=>{const active=i===index;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;const panel=document.getElementById('view-'+button.dataset.view);panel.classList.toggle('active',active);panel.hidden=!active});
 move(!scroll);if(focus)buttons[index].focus();const hash='#'+buttons[index].dataset.view;if(write&&location.hash!==hash)history.pushState(null,'',hash);if(scroll)window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});
 }
 function fromURL(){const i=buttons.findIndex(b=>'#'+b.dataset.view===location.hash);select(i<0?0:i,{write:false,scroll:false})}
 buttons.forEach((button,i)=>{button.addEventListener('click',()=>select(i));button.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(current+1)%buttons.length;if(event.key==='ArrowLeft')next=(current+buttons.length-1)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;if(next===undefined)return;event.preventDefault();select(next,{focus:true})})});
 window.addEventListener('popstate',fromURL);window.addEventListener('hashchange',fromURL);window.addEventListener('resize',()=>move(true));fromURL();return{select};
}
mountFloatingNavigation(document.querySelector('.nav'));
