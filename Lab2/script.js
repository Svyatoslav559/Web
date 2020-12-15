class Student{
	constructor(name, surname, age, ball){
		this.name = name;
		this.surname = surname;
		this.age = age;
		this.ball = ball;

		var isAvailable = function(){
			if(count > 0)
				return true;
			else
				return false;
		}

		this.sellStudent = function () {
			if(isAvailable())
			{
				this.count--;
				return true;
			}
			else
				return true;
		}
	}

	getCount(){
		return this.count;
	}
}

function inputArray(arr){
    arr.push(new Student("Иван", "Иванов", "4", "7"));
    arr.push(new Student("Петр", "Петров", "5", "6"));
    arr.push(new Student("Сидр", "Сидоров", "6", "5"));
    arr.push(new Student("Артём", "Дзюба", "32", "8"));
    arr.push(new Student("Федук", "LGевич", "19", "10"));
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

function printHead(table){
	var tr;
	tr = document.createElement("tr");
	tr.setAttribute("id", "trHead");
	addTh(tr, "thname", "Имя");
	addTh(tr, "thsurname", "Фамилия");
	addTh(tr, "thage", "Возраст");
	addTh(tr, "thball", "Средний бал");
	table.appendChild(tr);
}

function printString(table, item){
	var tr;
	tr = document.createElement("tr");
	tr.setAttribute("class", "tr");
	addTd(tr, "tdname", item.name);
	addTd(tr, "tdsurname", item.producer);
	addTd(tr, "tdage", item.strength);
	addTd(tr, "tdball", item.count);
	table.appendChild(tr);
}

function printTable(){
	var table = document.createElement("table");
	table.setAttribute("id","tb");
	printHead(table);
	for(var i = 0; i<arr.length; i++)
		printString(table,arr[i]);
	document.getElementById("main").appendChild(table);
}

function printAverage(){
	var p = document.createElement("p");
	var aver = 0;
	var arrCount = document.getElementsByClassName("tdBall");
	for (var i = 0; i < arrBall.length; i++)
	    aver += parseInt(arrBall[i].textContent);
	aver/=arrCount.length;
	p.appendChild(document.createTextNode("Среднее количество: " + aver));
	document.getElementById("main").appendChild(p);
}

function check(Student) {
    console.log(Student.getBall());
    console.log(Student.sellStudent());
    console.log(Student.getBall());
}

var arr = [];

inputArray(arr);
printTable();
printAverage();
check(arr[0]);
