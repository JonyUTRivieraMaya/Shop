var data = new Array();
let moneyUS= Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD"
  });

function AddCart(){
    var obj = this.event.target.parentElement;
    var precio = obj.querySelector(".price").textContent.replace("$","");
    var name = obj.querySelector(".card-title").textContent;
    var idprod = obj.querySelector(".btn").getAttribute('id');
    var desc = obj.querySelector(".card-text").textContent;
   var item = new Array({ "id": idprod, "name": name, "price": precio, "desc": desc});
   AddItem(item);
}

function loadData(){
    if(localStorage.getItem("cart")!=null){
        data = localStorage.getItem("cart");
        data = JSON.parse(data);

    }else{
        localStorage.setItem("cart","[]");
    }

}
function recoveryData(){
    if(localStorage.getItem("cart")!=null){
        data = localStorage.getItem("cart");
        data = JSON.parse(data);

    }else{
        localStorage.setItem("cart","[]");
    }
    
    var list= document.getElementById("list-item");
    
    document.getElementById("count").innerHTML= data.length;
    for(var id in data){
        console.log("indice: "+id+ "-->" + data[0].id);
        var li = renderItem(data[id]);
        
        list.appendChild(li);
        
    }
    getAmount();
}

function AddItem(item){
    data = localStorage.getItem("cart");
    data = JSON.parse(data);
    data.push(item);
    localStorage.setItem("cart", JSON.stringify(data));
    
}

function renderItem(d){
  var li = document.createElement("li");
  var div = document.createElement("div");
  var h6 = document.createElement("h6");
  var small = document.createElement("small");
  var span = document.createElement("span");
  var del = document.createElement("a");
  del.setAttribute("href","#");  

  li.className="list-group-item d-flex justify-content-between lh-sm";
  h6.className="my-0";
  small.className="text-muted";
  span.className="text-muted";
  del.className="btn btn-danger btn-sm";

  

  var delText = document.createTextNode(" X "); 
  var h6text =document.createTextNode(d[0].name);
  var smalltext =document.createTextNode(d[0].desc.slice(0,20) + "...");
  var spantext =document.createTextNode(moneyUS.format(d[0].price+ " "));
  li.dataset.id=d[0].id;

  //event DEL
  del.addEventListener("click", function(event){
    event.preventDefault();
    var list= document.getElementById("list-item");
    var nodes= Array.from(list.children);
    var li = event.target.parentElement.closest('li');
    var index =nodes.indexOf(li);  
    console.log(index);
    data.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(data)); 
    list.removeChild(li);
    document.getElementById("count").innerHTML= data.length;
    

})

  h6.appendChild(h6text);
  small.appendChild(smalltext); 
  span.appendChild(spantext);
  span.appendChild(del);
  div.appendChild(h6);  
  div.appendChild(small);
  li.appendChild(div);
  li.appendChild(span);

  return li;
  
}
function getAmount(){
    var amount = Number(0);
 for(var i in data){
    amount = Number(amount+data[i][0].price);
 }
 document.getElementById("amount").innerHTML= "<b>"+ moneyUS.format(amount) + "</b>";   
}
 