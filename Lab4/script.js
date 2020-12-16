class Student{
	constructor(name, surname, age, ball, id){
		this.name = name;
		this.surname = surname;
		this.age = age;
		this.ball = ball;
		this.id = id;

		var isAvailable = function(){
			if(ball > 0)
				return true;
			else
				return false;
		}

		this.sellStudent = function(){
			if(isAvailable())
			{
				this.ball--;
				return true;
			}
			else
				return true;
		}
	}

	getCount(){
		return this.ball;
	}
}

function generateID(){
	return `f${(~~(Math.random()*1e8)).toString(16)}`;
}

function addTh(tr, id, text){
	var th = $("<th>", {id: id});
	th.text(text);
	tr.append(th);
}

function addTd(tr, clas, text){
	var td = $("<td>", {class: clas});
	td.text(text);
	tr.append(td);
}

function newInputText(id){
	var input = $("<input>", {type: "text", id: id});
	return input;
}

function newInputButton(text, fn, id){
	var input = $("<input>", {type: "button", id: id, value: text, onclick: fn});
	return input;
}

function appendLine(div, text, id){
	div.append(text);
	div.append(newInputText(id));
	div.append($("<br>"));
}

function addElement(){
	var name, surname, age, ball;
	name = $("#inputname")[0].value;
	producer = $("#inputsurname")[0].value;
	strength = $("#inputage")[0].value;
	count = $("#inputball")[0].value;
	arr.push(new Student(name, surname, age, ball, generateID()));
	printString($("#tb"), arr[arr.length - 1]);
	printAverage();
}

function deleteTr(element){
	var tr = $(element).closest("tr")[0];
	var id = tr.id.slice("tr".length);
	var index = arr.findIndex(x => x.id == id);
	arr.splice(index, 1);
   $("#tr"+id).remove();
   printAverage();
}

function printFields(){
	var div = $("#fields");
		appendLine(div, "Имя: ", "inputname");
		appendLine(div, "Фамилия: ", "inputsurname");
		appendLine(div, "Возраст: ", "inputage");
		appendLine(div, "Балл: ", "inputball");
		div.append(newInputButton("Добавить", "addElement()", "addElemButton"));
}

function printString(table, item){
	var tr;
	tr = $("<tr>", {class: "tr", id: "tr" + item.id});
	addTd(tr, "tdname", item.name);
	addTd(tr, "tdsurname", item.surname);
	addTd(tr, "tdage", item.age);
	addTd(tr, "tdball", item.count);
	var td = $("<td>", {class: "tdDelete"});
	td.append(newInputButton("Удалить", "deleteTr(this)", "deleteButton"));
	tr.append(td);
	table.append(tr);
}

function printHead(table){
	var tr;
	tr = $("<tr>", {id: "trHead"});
	addTh(tr, "thname", "Имя");
	addTh(tr, "thsurname", "Фамилия");
	addTh(tr, "thage", "Возраст");
	addTh(tr, "thball", "Балл");
	table.append(tr);
}

function printTable(){
	var table = $("<table>", {id: "tb"});
	printHead(table);
	for(var i = 0; i<arr.length; i++)
		printString(table, arr[i]);
	$("#main").append(table);
}

function printAverage(){
	var div = $("#average");
	var aver = 0;
	var arrball = $(".tdCount");
	for(var i = 0; i<arrball.length; i++)
		aver+=parseInt(arrball[i].textContent);
	aver/=arrball.length;
	div.text("Средний балл: " + aver);
}

function inputArray(){
	$.ajax({url: "http://localhost:3000", async: false, success: function(data){
		for(var i=0;i<data.length;i++)
			arr.push(new Student(data[i].name,data[i].surname,data[i].age,data[i].ball,generateID()));
	}});
}

var arr = [];

inputArray();
printTable();
printAverage();
printFields();