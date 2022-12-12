
var main = document.querySelector(".main")
var sel = document.querySelector("select")
var inp = document.querySelector("input")
let pages = document.querySelector(".pages")
var copyarr = []
var copyarr2 = []
let btns = []
let itemPerPage = 8
var pagecount = 0
let xhr = new XMLHttpRequest()
xhr.open("GET","https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")

xhr.onloadstart = function(){
    console.log("request sent")
}

xhr.send()
xhr.onloadend = function(){
    let x = JSON.parse(xhr.responseText)
    pagecount = Math.ceil(x.length / itemPerPage)

    for(var i = 1; i <= pagecount; i++){
        let sp = document.createElement("span")
        sp.innerText = i
        pages.appendChild(sp)
        sp.classList.add("pclick")
    }

    let img = document.createElement("img")
    img.src = "http://cdn.onlinewebfonts.com/svg/img_418607.png"
    img.classList.add("right")
    pages.appendChild(img)
    let pclick = document.querySelectorAll(".pclick")
    displayItems(x,0,itemPerPage)

    for(let k of pclick){
        k.addEventListener("click", function(){
            var currentpage = ([...pclick].indexOf(this)+1)
            var prevpage = currentpage-1
            var nextpage = currentpage+1
            
            for(let j=0; j<1; j++){
                var spprev = document.createElement("span")
                spprev.innerText = prevpage
                pages.appendChild(spprev)
                spprev.classList.add("pclick")
            }
            for(let b=0; b<1; b++){
                var spcurr = document.createElement("span")
                spcurr.innerText = currentpage
                pages.appendChild(spcurr)
                spcurr.classList.add("pclick")
            }
            for(let t=0; t<1; t++){
                var spnext = document.createElement("span")
                spnext.innerText = nextpage
                pages.appendChild(spnext)
                spnext.classList.add("pclick")
            }
            // console.log(currentpage)
            // console.log(prevpage, nextpage)
        });
    }

    for(let i of pclick){
        i.addEventListener("click",function(){
            main.innerHTML = ""
            let start = (i.innerText-1)*itemPerPage
            let end = i.innerText*itemPerPage
          displayItems(x,start,end)
          console.log(x,start,end)

            let ind = [...pclick].findIndex(i=> this)
            console.log(ind)
            if(this.style.backgroundColor != "blue" && ind==0){
                this.style.backgroundColor = "blue"
                this.style.color = "white"
                this.style.fontWeight = "bold"
                this.style.width = "30px"
                this.style.textAlign = "center"
                this.style.borderRadius = "50%"
                if(i.style.backgroundColor == "blue" && ind!=0){
                    i.style.backgroundColor = "white"
                }
            }
            else if(this.style.backgroundColor == "blue"){
                i.style.backgroundColor = "white"
                i.style.color = "black"
                i.style.fontWeight = "400"
                i.style.width = "10px"
            }
        });
    }

    var left = document.querySelector(".left")
    var right = document.querySelector(".right")
    left.addEventListener("click",function(){
        main.innerHTML = ""
        displayItems(x,0,itemPerPage)
    });
    right.addEventListener("click",function(){
        let lastPageCount = x.length % itemPerPage
        main.innerHTML = ""
        displayItems(x,x.length-lastPageCount,x.length)
    });
    
    btns = document.querySelectorAll(".show")
    for(let i of btns){
        i.addEventListener("click",function(){
            let p = this.parentNode.children[1]
            let b = this.parentNode.children[2]
             if(p.style.height != "auto"){
               p.style.height = "auto"
               b.innerText = "show less"
             }
             else{
               p.style.height = "170px"
               b.innerText = "show more"
             }
        });
    }
}

sel.addEventListener("change",function(){
    if(sel.value == "asscending"){
          copyarr.sort(function(a,b){
            return a.price - b.price
        });
        main.innerHTML = ""
        displayItems(copyarr)
    }
    else if(sel.value == "descending"){
        copyarr.sort(function(b,a){
            return a.price - b.price
        });
        main.innerHTML = ""
        displayItems(copyarr)
    }
});

function displayItems(arr,start,end){
    for(let i = start ; i < end ; i++){
        let tmp = `
                <div class="card" style="width: 18rem;">
        <img src="${arr[i].image_link}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${arr[i].name}</h5>
            <p class="card-text">${arr[i].description}</p>
            <button class="show">show more</button>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${arr[i].product_type}</li>
            <li class="list-group-item">${arr[i].price}$</li>
        </ul>
        <div class="card-body">
            <a href="${arr[i].product_link}" class="card-link">info</a>
            <a href="${arr[i].website_link}" class="card-link">Website</a>
        </div>
        </div>
        `
        main.innerHTML += tmp
    }  
}

inp.addEventListener("keyup",function(){
    let filterarr = copyarr2.filter(i=> i.name.toLowerCase().includes(inp.value))
    main.innerHTML = ""
    displayItems(filterarr)
});