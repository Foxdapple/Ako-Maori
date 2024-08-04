// Set up different pages
const showHome = () => {
    document.getElementById("homelink").style.backgroundColor = "#04AA6D";
    document.getElementById("guestlink").style.removeProperty("background-color");
    document.getElementById("shoplink").style.removeProperty("background-color");
    document.getElementById("registrationlink").style.removeProperty("background-color");
    document.getElementById("loginlink").style.removeProperty("background-color");
    document.getElementById("eventslink").style.removeProperty("background-color");
    document.getElementById("learninglink").style.removeProperty("background-color");
    document.getElementById("home").style.display = "block";
    document.getElementById("guest").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("events").style.display = "none";
    document.getElementById("learning").style.display = "none";
}

const showGuest = () => {
    document.getElementById("homelink").style.removeProperty("background-color");
    document.getElementById("guestlink").style.backgroundColor = "#04AA6D";
    document.getElementById("shoplink").style.removeProperty("background-color");
    document.getElementById("registrationlink").style.removeProperty("background-color");
    document.getElementById("loginlink").style.removeProperty("background-color");
    document.getElementById("eventslink").style.removeProperty("background-color");
    document.getElementById("learninglink").style.removeProperty("background-color");
    document.getElementById("home").style.display = "none";
    document.getElementById("guest").style.display = "block";
    document.getElementById("shop").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("events").style.display = "none";
    document.getElementById("learning").style.display = "none";
}

const showShop = () => {
    document.getElementById("homelink").style.removeProperty("background-color");
    document.getElementById("guestlink").style.removeProperty("background-color");
    document.getElementById("shoplink").style.backgroundColor = "#04AA6D";
    document.getElementById("registrationlink").style.removeProperty("background-color");
    document.getElementById("loginlink").style.removeProperty("background-color");
    document.getElementById("eventslink").style.removeProperty("background-color");
    document.getElementById("learninglink").style.removeProperty("background-color");
    document.getElementById("home").style.display = "none";
    document.getElementById("guest").style.display = "none";
    document.getElementById("shop").style.display = "block";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("events").style.display = "none";
    document.getElementById("learning").style.display = "none";

    const ourTable = document.getElementById('shopTable');
    const fetchPromise = fetch('https://cws.auckland.ac.nz/ako/api/AllItems');
    const streamPromise = fetchPromise.then( (response) => response.json() );
    streamPromise.then( (data) => showDetails(data) );
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keyup', (event) => {
        var term = searchBar.value;
        if (term != ""){
            ourTable.innerHTML = "";
            const fetchPromise2 = fetch(`https://cws.auckland.ac.nz/ako/api/Items/${term}`);
            const streamPromise2 = fetchPromise2.then( (response2) => response2.json() );
            streamPromise2.then( (data2) => showDetails(data2));
        } else {
            streamPromise.then( (data) => showDetails(data) );
        }
    });
}

const showDetails = (orders) => {
    let htmlString = "<tr class='tableTitles'><td></td><td>ID</td><td>NAME</td><td>DESC</td><td>PRICE</td></tr>";

    const showItem = (order) => {
        htmlString += `<tr><td><img class="itemImages" src="https://cws.auckland.ac.nz/ako/api/ItemImage/${order.id}"></td><td>${order.id}</td><td>${order.name}</td><td>${order.description}</td><td>$${order.price}</td><td><button onclick="buyItem(${order.id}, \'${order.name}\')">BUY</button></td></tr>`;
    }
    orders.forEach(showItem);
    const ourTable = document.getElementById("shopTable");
    ourTable.innerHTML = htmlString;
}

const buyItem = (id, name) => {
    if (localStorage.getItem('username') == null){
        alert_user("Please login.")
        showLogin();
    } else {
        const fetchPromise = fetch(`https://cws.auckland.ac.nz/ako/api/PurchaseItem/${id}`,
        {
            headers: {
                "Authorization": "Basic " + btoa(`${localStorage.getItem('username')}:${localStorage.getItem('password')}`),
            },
        });
        const streamPromise = fetchPromise.then( (response) => response.json() );
        streamPromise.then( (data) => boughtItem(data, name) ); 
    }
}

const boughtItem = (object, name) => {
    const product_id = object.productID.slice(3)
    alert_user(`Thank you user ${localStorage.getItem('username')}, for buying ${name}`)
}

const showRegistration = () => {
    document.getElementById("homelink").style.removeProperty("background-color");
    document.getElementById("guestlink").style.removeProperty("background-color");
    document.getElementById("shoplink").style.removeProperty("background-color");
    document.getElementById("registrationlink").style.backgroundColor = "#04AA6D";
    document.getElementById("loginlink").style.removeProperty("background-color");
    document.getElementById("eventslink").style.removeProperty("background-color");
    document.getElementById("learninglink").style.removeProperty("background-color");
    document.getElementById("home").style.display = "none";
    document.getElementById("guest").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("register").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("events").style.display = "none";
    document.getElementById("learning").style.display = "none";
}

const showLogin = () => {
    const user = localStorage.getItem('username');
    if (user != null){
        alert_user(`${user} Already logged in, please logout.`)
    } else {
        document.getElementById("homelink").style.removeProperty("background-color");
        document.getElementById("guestlink").style.removeProperty("background-color");
        document.getElementById("shoplink").style.removeProperty("background-color");
        document.getElementById("registrationlink").style.removeProperty("background-color");
        document.getElementById("loginlink").style.backgroundColor = "#04AA6D";
        document.getElementById("eventslink").style.removeProperty("background-color");
        document.getElementById("learninglink").style.removeProperty("background-color");
        document.getElementById("home").style.display = "none";
        document.getElementById("guest").style.display = "none";
        document.getElementById("shop").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("events").style.display = "none";
        document.getElementById("learning").style.display = "none";
    }
}

const showEvents = () => {
    document.getElementById("homelink").style.removeProperty("background-color");
    document.getElementById("guestlink").style.removeProperty("background-color");
    document.getElementById("shoplink").style.removeProperty("background-color");
    document.getElementById("registrationlink").style.removeProperty("background-color");
    document.getElementById("loginlink").style.removeProperty("background-color");
    document.getElementById("eventslink").style.backgroundColor = "#04AA6D";
    document.getElementById("learninglink").style.removeProperty("background-color");
    document.getElementById("home").style.display = "none";
    document.getElementById("guest").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("events").style.display = "block";
    document.getElementById("learning").style.display = "none";
    document.getElementById("eventDisplay").innerHTML = "";
    const fetchPromise = fetch('https://cws.auckland.ac.nz/ako/api/EventCount');
    const streamPromise = fetchPromise.then( (response) => response.json() );
    streamPromise.then( (data) => fetchEvents(data) );
}

const showLearning = () => {
    document.getElementById("homelink").style.removeProperty("background-color");
    document.getElementById("guestlink").style.removeProperty("background-color");
    document.getElementById("shoplink").style.removeProperty("background-color");
    document.getElementById("registrationlink").style.removeProperty("background-color");
    document.getElementById("loginlink").style.removeProperty("background-color");
    document.getElementById("eventslink").style.removeProperty("background-color");
    document.getElementById("learninglink").style.backgroundColor = "#04AA6D";
    document.getElementById("home").style.display = "none";
    document.getElementById("guest").style.display = "none";
    document.getElementById("shop").style.display = "none";
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("events").style.display = "none";
    document.getElementById("learning").style.display = "block";
    document.getElementById("gameDisplay").innerHTML = "";
    const fetchPromise = fetch('https://cws.auckland.ac.nz/ako/api/MatchingPair');
    const streamPromise = fetchPromise.then( (response) => response.json() );
    streamPromise.then( (data) => matchingGame(data));

}

const reload_game = () => {
    const fetchPromise = fetch('https://cws.auckland.ac.nz/ako/api/MatchingPair');
    const streamPromise = fetchPromise.then( (response) => response.json() );
    streamPromise.then( (data) => matchingGame(data));
}

const matchingGame = (data) => {
    const display = document.getElementById("gameDisplay");
    const type = data.type.split(":");
    const items = data.pairs.split("|");
    const front_type = type[0];
    const end_type = type[1]; // can get the tag by doing "<" + "tag" + ">"
    const item_list = itemList(items); // can use .includes(item); to see if an object is in a list
    const leftMatchTag = get_tag(front_type); // <- that side of the page
    const rightMatchTag = get_tag(end_type); // -> that side of the page
    const shuffle_match = shuffle(item_list, leftMatchTag);

    // alert_user(item_list);

    let htmlString = "<tr class='tableTitles'><td>Base</td><td>Match Here</td><td>Source</td></tr>";
    let htmlLeft;
    let htmlRight;
    for (let i = 0; i<item_list.length; i++){
        // display.innerHTML += item_list[i][0] + " " + shuffle_match[i][1] + "<br>";
        htmlLeft = make_game_table(leftMatchTag, item_list[i][0]);
        htmlRight = make_game_table(rightMatchTag, shuffle_match[i][1], "right", shuffle_match[i][0]);
        // alert_user(shuffle_match[i][0] + " " + shuffle_match[i][1]);
        htmlString += "<tr>" + 
        htmlLeft + 
        `<td ondrop="mydrop(event)" ondragover="mydragover(event)"><div style="display:none;">` + item_list[i][0] + "|</div></td>" + 
        htmlRight + "</tr>";
    }
    display.innerHTML = htmlString;
    score_check();
}

const make_game_table = (tag, item, direction, item_to_match) => {
    let htmlString;
    if (direction == "right"){
        htmlString = `<td ondrop="mydrop(event)" ondragover="mydragover(event)">` + 
        "<" + tag + ` class="item_to_match" id="${item_to_match}" draggable="true" ondragstart="mydragstart(event)"`;
    } else {
        htmlString = `<td class="static_match">` + 
        "<" + tag + ` draggable="false"`;
    }
    if (tag == "img") {
        htmlString += 
            " src=" + `${item}` + ">" + 
            "</" + tag + ">" + 
        "</td>";
    } else if (tag == "audio"){
        htmlString +=
                " controls>" + 
                "<source src="+ `${item}` + ">" + 
            "</" + tag + ">" + 
        "</td>";
    } else{
        htmlString += 
            ">" + 
                item + 
            "</" + tag + ">" + 
        "</td>";
    }
    return htmlString;
}

const mydragstart = (ev) => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

const mydragover = (ev) => {
    ev.preventDefault();
}

const mydrop = (ev) => {
    if (ev.dataTransfer !== null) {
        const data = ev.dataTransfer.getData("text/plain");
        document.getElementById(data).parentNode.style.removeProperty("background-color");
        ev.target.appendChild(document.getElementById(data));
        const item_required = ev.target.textContent.split("|")[0];
        if (item_required == data){
            document.getElementById(data).parentNode.style.background = "green";
        } else {
            document.getElementById(data).parentNode.style.background = "red";
        }
        score_check();
        ev.preventDefault();
    }
}

const score_check = () => {
    const table = document.getElementById("gameDisplay");
    let count = 1;
    let legnth_of_table = table.rows.length;
    for (let i = 0; i < legnth_of_table; i++){
        if (table.rows[i].childNodes[1].style.backgroundColor == "green"){
            count += 1;
        }
        
    }
    if (legnth_of_table == 0){
        legnth_of_table = 1
    }
    document.getElementById("score").innerHTML = `Score: ${count-1}/${legnth_of_table-1}`;
}

const get_tag = (type) => {
    switch (type) {
        case "string":
            return "p";
        case "image":
            return "img";
        case "audio":
            return "audio";
    }
}

const itemList = (items, tag) => {
    const return_list = []
    for (let i = 0; i<items.length; i++){
        const temp_object = items[i].split("@");
        return_list.push([temp_object[0], temp_object[1]]);
    }
    return return_list;
}

const shuffle = (list) => {
    const new_list = [];
    list.forEach(e => new_list.push(e))
    for (let i = new_list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        [new_list[i], new_list[j]] = [new_list[j], new_list[i]]; 
    }
    return new_list;
}

const fetchEvents = (number_of_events) => {
    for (let i = 0; i < number_of_events; i++){
        const fetchPromise = fetch(`https://cws.auckland.ac.nz/ako/api/Event/${i}`);
        const streamPromise = fetchPromise.then( (response) => response.text() );
        streamPromise.then( (data) => showEvent(data, i) );
    }
}

const showEvent = (data, id) => {
    const display = document.getElementById("eventDisplay");
    const events = formatIcs(data);
    events[0]["ID"] = id;
    const date_start = formatDate(events[0].DTSTART);
    const date_end = formatDate(events[0].DTEND);
    display.innerHTML += 
    "<div class='col span_1_of_4' id='event_span1'>" + 
        "<div id='eventInfo'>" +
            "<div id='eventID'>" + 
                "<p>" + `Event id: ${events[0].ID}` + "</p>" +
            "</div>" + 
            "<div id='eventSummary'>" + 
                "<h2>" + events[0].DESCRIPTION + "</h2>" + 
                "<p>" + `📌 ${events[0].LOCATION}` + "</p>" +
            "</div>" + 
            "<table>" +
                "<tr>" + "<td>" + "Start:" + "</td>" + "<td>" + date_start + "</td>" + "</tr>" +
                "<tr>" + "<td>" + "End:" + "</td>" + "<td>" + date_end + "</td>" + "</tr>" +
                "<tr>" + "<td>" + "Summary:" + "</td>" + "<td>" + events[0].SUMMARY + "</td>" + "</tr>" +
            "</table>" +
            `<div id='eventDownload' onclick="download(${events[0].ID})">` + 
                "<p>" + `Download` + "</p>" +
            "</div>" + 
        "</div>" +
    "</div>";
}

const formatDate = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    const time_slice = date.slice(8);
    const hour = time_slice.slice(1, 3);
    const min = time_slice.slice(3, 5);
    const second = time_slice.slice(5, 7);
    const time = hour + ":" + min + ":" + second;
    return year + "-" + month + "-" + day + " " + time;
}

const download = (id) => {
    const download_obj = document.getElementById('download_ics')
    download_obj.src = `https://cws.auckland.ac.nz/ako/api/Event/${id}`;
}

function formatIcs(icsString){
    const lines = icsString.split('\n');
    const regex = RegExp("^([A-Z]+):(.*)$");
    const events = [];
    let event;
    for (let i = 0; i < lines.length; i++){
        const line = lines[i].trim();
        if (line === 'BEGIN:VEVENT'){
            event = {};
        } else if (line === 'END:VEVENT'){
            events.push(event);
        } else if (event) {
            const match = regex.exec(line);
            if (match) {
                const [, key, value] = match;
                event[key] = value;
            }
        } 
    }
    return events;
}

const comment = () => {
    const comment = document.getElementById('commentBox').value;
    const name = document.getElementById('commentName').value;
    const fetchPromise = fetch('https://cws.auckland.ac.nz/ako/api/Comment',
    {
        headers : {
            "Content-Type" : "application/json",
        },
        method : "POST",
        body : JSON.stringify({comment: comment, name: name})
    });
    comment.value = "";
    name.value = "";
    alert_user("Comment made.");
    document.getElementById('guestcomments').src = document.getElementById('guestcomments').src;
}

const register = () => {
    const user = document.getElementById("runame").value;
    const password = document.getElementById("rpword").value;
    const address = document.getElementById("radd").value;
    const fetchPromise = fetch('https://cws.auckland.ac.nz/ako/api/Register',
    {
        headers : {
            "Content-Type" : "application/json",
        },
        method : "POST",
        body : JSON.stringify({username: user, password: password, address: address})
    });
    const streamPromise = fetchPromise.then( (response) => response.text() );
    streamPromise.then( (data) => alert_user(data) );
    document.getElementById("runame").value = '';
    document.getElementById("rpword").value = '';
    document.getElementById("radd").value = '';
}

const login = () => {
    const user = document.getElementById("luname").value;
    const password = document.getElementById("lpword").value;
    const fetchPromise = fetch('https://cws.auckland.ac.nz/ako/api/TestAuth',
    {
        headers : {
            "Authorization": "Basic " + btoa(`${user}:${password}`),
        },
    });
    const streamPromise = fetchPromise.then( (response) => {
        if (response.ok) {
            localStorage.setItem('username', user);
            localStorage.setItem('password', password);
            document.getElementById("luname").value = '';
            document.getElementById("lpword").value = '';
            document.getElementById("status").innerHTML= `Logged in as: ${user}`;
            document.getElementById("signout_button").style.display = "block";
            document.getElementById("signout_button").style.float = "right";
            showHome();
        } else {
            alert_user(`Invalid login for ${user}.`);
        }
    });
}

const signout = () => {
    localStorage.clear();
    document.getElementById("signout_button").style.display = "none";
    document.getElementById("status").innerHTML= "Not logged in.";
}


window.addEventListener('resize', windowResize)

function windowResize() {
    var width = document.documentElement.clientWidth;
    var x = document.getElementById("myTopnav");
    if (width <= 1700){
        x.className += " responsive";
    }
    else{
        x.className = "topnav";
    }
    
}

const hidePopup = () => {
    document.getElementById("alert_popup").style.display = "none";
}

const alert_user = (alert_msg) => {
    document.getElementById("alert_popup").style.display = "block";
    document.getElementById("notifying_text").innerHTML = alert_msg;
}

// runs setup commands on start of the application
const start = () => {
    showHome();
    document.getElementById("alert_popup").style.display = "none";
    document.getElementById("signout_button").style.display = "none";
    signout();
}

window.onload = start();