(function(){
  function embed(id){
    var f=document.createElement('iframe');
    f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';
    f.title='YouTube video player';
    f.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen=true;
    return f;
  }
  // Click-to-play thumbnails
  document.querySelectorAll('a[data-yt]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      var box=a.parentNode; box.classList.add('is-playing');
      box.replaceChild(embed(a.dataset.yt),a);
    });
  });
  // Pop-up player for term links and alternate angles
  var dlg=null;
  function open(id){
    if(!dlg){
      dlg=document.createElement('dialog'); dlg.className='yt-dialog';
      dlg.innerHTML='<button class="yt-close" aria-label="Close video">×</button><div class="yt-frame"></div>';
      document.body.appendChild(dlg);
      dlg.querySelector('.yt-close').addEventListener('click',function(){dlg.close();});
      dlg.addEventListener('click',function(e){ if(e.target===dlg) dlg.close(); });
      dlg.addEventListener('close',function(){ dlg.querySelector('.yt-frame').innerHTML=''; });
    }
    var fr=dlg.querySelector('.yt-frame'); fr.innerHTML=''; fr.appendChild(embed(id));
    dlg.showModal();
  }
  document.querySelectorAll('a[data-yt-pop]').forEach(function(a){
    a.addEventListener('click',function(e){
      if(typeof HTMLDialogElement==='undefined') return; // fall back to YouTube link
      e.preventDefault(); open(a.dataset.ytPop);
    });
  });
})();
