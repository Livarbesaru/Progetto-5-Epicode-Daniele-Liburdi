
 var arrayAnimali  = ['🐱', '🦉', '🐾', '🦄', '🦋', '🐛', '🐝','🐬','🐱', '🦉', '🐾', '🦄', '🦋', '🐛', '🐝','🐬'];
 var arrayAnimali2 =["🐉","🐘","🐐","🐸","🦑","🦍","🐵","🐼","🐪","🐉","🐘","🐐","🐸","🦑","🦍","🐵","🐼","🐪"]
 var arrayAnimali3=["🐢","🦔","🐖","🐏","🦏","🦈","🐚","🦛","🦝","🦢","🐣","🐢","🦔","🐖","🐏","🦏","🦈","🐚","🦛","🦝","🦢","🐣"]
 //  var arrayAnimali  = ['&#128044;', '&#128044;', '&#128044;', '&#128044;', '&#128044;', '&#128027;', '&#128029;','&#128044;','&#128044;', '&#128044;', '&#128044;', '&#128044;', '&#128044;', '&#128027;', '&#128029;','&#128044;'];

  var livello=0;

   var arrayComparison = [];
   
   document.body.onload = startGame();

   // mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
   
   var interval;
   var iconsFind = document.getElementsByClassName("find");
   var modal = document.getElementById('modal');
   var timer = document.querySelector(".timer");
  
   //una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
   function shuffle(a) {
     var currentIndex = a.length;
     var temporaryValue, randomIndex;
   
     while (currentIndex !== 0) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = a[currentIndex];
       a[currentIndex] = a[randomIndex];
       a[randomIndex] = temporaryValue;
     }
     return a;
   }

   // una funzione che rimuove la classe active e chiama la funzione startGame()

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto
   
   function playAgain(){
     modal.classList.remove("active");
     startGame();
   }
   
   function startGame(){

    livello++

    if(livello==4){
      livello=1
    }
     clearInterval(interval);
     arrayConfronto = [];
     if(livello==1){
      var arrayShuffle = shuffle(arrayAnimali);
      }

     else if(livello==2){
     var ArrayAnimali2 = arrayAnimali.concat(arrayAnimali2)
     var arrayShuffle = shuffle(ArrayAnimali2);
     }

     else if(livello==3){
      var insieme = arrayAnimali.concat(arrayAnimali2)
      var ArrayAnimali3 = arrayAnimali3.concat(insieme)
      var arrayShuffle = shuffle(ArrayAnimali3);
     }

     var lista = document.getElementById('griglia');
     while (lista.hasChildNodes()) {  
       lista.removeChild(lista.firstChild);
     }

     if(livello==1){
      for(var i = 0; i < 16; i++){    
      // var id = 'icon-' + i;
      var box = document.createElement('div');
      var element = document.createElement('div');
      element.className = 'icon';
      document.getElementById('griglia').appendChild(box).appendChild(element);
      element.innerHTML = arrayShuffle[i];
      }
    }

     else if(livello==2){
       for(var i = 0; i < 34; i++){    
       // var id = 'icon-' + i;
       var box = document.createElement('div');
       var element = document.createElement('div');
       element.className = 'icon';
       document.getElementById('griglia').appendChild(box).appendChild(element);
       element.innerHTML = arrayShuffle[i];
       }
      }

      else if(livello==3){
        for(var i = 0; i < 56; i++){    
          // var id = 'icon-' + i;
          var box = document.createElement('div');
          var element = document.createElement('div');
          element.className = 'icon';
          document.getElementById('griglia').appendChild(box).appendChild(element);
          element.innerHTML = arrayShuffle[i];
      }
     }
   
   
     startTimer();
   
     var icon = document.getElementsByClassName("icon");
     var icons = [...icon];
   
     for (var i = 0; i < icons.length; i++){
       icons[i].addEventListener("click", displayIcon);
       icons[i].addEventListener("click", openModal);
     }

    var titolo=document.getElementById("titolo")
    titolo.classList.add("titolo")
    console.log(livello)
    if(livello==1){titolo.innerHTML=`Sei al livello ${livello}, trova le coppie nelle 16 caselle`}
    else if(livello==2){titolo.innerHTML=`Sei al livello ${livello}, trova le coppie nelle 34 caselle`}
    else if(livello==3){titolo.innerHTML=`Sei al livello ${livello}, trova le coppie nelle 56 caselle`}
    }

   function displayIcon(){
   
     var icon = document.getElementsByClassName("icon");
     var icons = [...icon];

     /*
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];
    è uguale a 
    var icons = document.getElementsByClassName("icon");
    //var icons = [...icon];
    è un operatore che serve per passare un array come argomento:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 
    https://www.tutorialspoint.com/es6/es6_operators.htm (cerca spread nella pagina)
    */

    //mette/toglie la classe show
   
     this.classList.toggle("show");

     //aggiunge l'oggetto su cui ha cliccato all'array del confronto

     arrayComparison.push(this);
   
     var len = arrayComparison.length;
     //se nel confronto ci sono due elementi
     if(len === 2){
        //se sono uguali aggiunge la classe find
       if(arrayComparison[0].innerHTML === arrayComparison[1].innerHTML){
         arrayComparison[0].classList.add("find","disabled");
         arrayComparison[1].classList.add("find","disabled");
         arrayComparison = [];               
       } else {
         //altrimenti (ha sbagliato) aggiunge solo la classe disabled
         icons.forEach(function(item){
           item.classList.add('disabled');
         });
          // con il timeout rimuove  la classe show per nasconderli
         setTimeout(function(){
           arrayComparison[0].classList.remove("show");
           arrayComparison[1].classList.remove("show");
           icons.forEach(function(item){
             item.classList.remove('disabled');
             for(var i = 0; i < iconsFind.length; i++){
                 iconsFind[i].classList.add("disabled");
               }
           });
           arrayComparison = [];
         },700); 
        }
     }
   }
   //una funzione che viene mostrata alla fine quando sono tutte le risposte esatte

// una funzione che nasconde la modale alla fine e riavvia il gioco

// una funzione che calcola il tempo e aggiorna il contenitore sotto
   
   
   function openModal(){  
     if(livello==1){
       if (iconsFind.length == 16){
       clearInterval(interval);
       modal.classList.add("active");
       document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
       closeModal();
     }
    }
    else if(livello==2){
      if (iconsFind.length == 34){
        clearInterval(interval);
        modal.classList.add("active");
        document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
        closeModal();
      }
    }
    else if(livello==3){
      if (iconsFind.length == 56){
        clearInterval(interval);
        modal.classList.add("active");
        document.getElementById("tempoTrascorso").innerHTML = timer.innerHTML;
        closeModal();
      }
    }
   }
   
   function closeModal(){  
     closeicon.addEventListener("click", function(e){
       modal.classList.remove("active");
       startGame();
     });
   }
   
   
   function startTimer(){
 
     var s = 0; var  m = 0; var h = 0;
   
     interval = setInterval(function(){
     timer.innerHTML = 'Tempo: ' + m + " min " + s + " sec";
       s++;
       if(s == 60){
         m++;
         s = 0;
       }
       if(m == 60){
         h++;
         m = 0;
       }
     },1000);
   }