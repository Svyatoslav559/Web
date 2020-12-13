class Vodka{
	constructor(name, producer, strength, count){
		this.name = name;
		this.surname = surname;
		this.strength = strength;
		this.ball = ball;

		var isAvailable = function(){
			if(count > 0)
				return true;
			else
				return false;
		}

		this.sellStudent = function(){
			if(isAvailable())
			{
				this.count--;
				return true;
			}
			else
				return true;
		}
	}

	getBall(){
		return this.count;
	}
}

function addTh(tr, id, text){
	var th = document.createElement("th");
	th.setAttribute("id", id);
	th.appendChild(document.createTextNode(text));
	tr.appendChild(th);
}

function addTd(tr, clas, text){
	var td = document.createElement("td");
	td.setAttribute("class", clas);
	td.appendChild(document.createTextNode(text));
	tr.appendChild(td);
}

function newP(text){
	var p = document.createElement("p");
	p.appendChild(document.createTextNode(text));
	return p;
}

function newInputText(id){
	var input = document.createElement("input");
	input.setAttribute("type", "text");
	input.setAttribute("id", id);
	return input;
}

function newInputButton(text, fn, id){
	var input = document.createElement("input");
	input.setAttribute("type", "button");
	input.setAttribute("value", text);
	input.setAttribute("onclick", fn);
	input.setAttribute("id", id);
	return input;
}

function appendLine(div, text, id){
	div.appendChild(document.createTextNode(text));
	div.appendChild(newInputText(id));
	div.appendChild(document.createElement("br"));
}

function addElement(){
	var name, producer, strength, count;
	name = document.getElementById("inputName").value;
	surname = document.getElementById("inputProducer").value;
	age = document.getElementById("inputStrength").value;
	ball = document.getElementById("inputCount").value;
	arr.push(new Vodka(name, surname, age, ball));
	printString(document.getElementById("tb"), arr[arr.length - 1], (arr.length - 1));
	printAverage();
}

function deleteTr(element){
	var index = parseInt(element.id.slice("delete".length));
	arr.splice(index, 1);
   document.getElementById('tb').removeChild(document.getElementById('tr'+index));
   for(var i=index; i < arr.length; i++)
    {
        document.getElementById('delete'+(i+1)).setAttribute("id","delete"+i);
        document.getElementById('tr'+(i+1)).setAttribute("id","tr"+i);
    }
    printAverage();
}

function printFields(){
	var div = document.getElementById("fields");
	appendLine(div, "Имя: ", "inputName");
	appendLine(div, "Фамилия: ", "inputSurname");
	appendLine(div, "Возраст: ", "inputAge");
	appendLine(div, "Средний бал: ", "inputBall");
	div.appendChild(newInputButton("Добавить", "addElement()", "addElemButton"));
}

function printString(table, item, index){
	var tr;
	tr = document.createElement("tr");
	tr.setAttribute("class", "tr");
	tr.setAttribute("id", "tr" + index)
	addTd(tr, "tdName", item.name);
	addTd(tr, "tdSurname", item.producer);
	addTd(tr, "tdAge", item.strength);
	addTd(tr, "tdBall", item.count);
	var td = document.createElement("td");
	td.setAttribute("class", "tdDelete");
	td.appendChild(newInputButton("Удалить", "deleteTr(this)", "delete" + index));
	tr.appendChild(td);
	table.appendChild(tr);
}

function printHead(table){
	var tr;
	tr = document.createElement("tr");
	tr.setAttribute("id", "trHead");
	addTh(tr, "thName", "Название");
	addTh(tr, "thSurname", "Производитель");
	addTh(tr, "thAge", "Содержание алкоголя");
	addTh(tr, "thBall", "Количество");
	table.appendChild(tr);
}

function printTable(){
	var table = document.createElement("table");
	table.setAttribute("id","tb");
	printHead(table);
	for(var i = 0; i<arr.length; i++)
		printString(table, arr[i], i);
	document.getElementById("main").appendChild(table);
}

function printAverage(){
	var div = document.getElementById("average");
	while(div.firstChild){
		div.removeChild(div.firstChild);
	}
	var aver = 0;
	var arrBall = document.getElementsByClassName("tdBall");
	for(var i = 0; i<arrCount.length; i++)
		aver+=parseInt(arrCount[i].textContent);
	aver/=arrCount.length;
	div.appendChild(newP("Средний балл: " + aver));
}

function printAddButton(){
	var div = document.getElementById("fields");
		appendLine(div, "Название: ", "inputName");
		appendLine(div, "Фамилия: ", "inputSurname");
		appendLine(div, "Возраст: ", "inputAge");
		appendLine(div, "Средний балл: ", "inputBall");
		div.appendChild(newInputButton("Добавить", "addElement()", "addElemButton"));
}

function inputArray(){
	var xhr = new XMLHttpRequest();
	var tmp = [];
	xhr.open('GET', 'http://localhost:3000', false);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			tmp = JSON.parse(xhr.responseText);
			for(var i=0;i<tmp.length;i++)
				arr.push(new Student(tmp[i].name,tmp[i].surname,tmp[i].age,tmp[i].ball));
		}
	}
	xhr.send();
}

var arr = [];

inputArray();
printTable();
printAverage();
printAddButton();