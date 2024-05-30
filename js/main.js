var WebsiteName = document.getElementById("SiteName");
var Visit = document.getElementById("SiteURL");

var InfosArr = JSON.parse(localStorage.getItem("websiteInfos")) ?? [];
displayInfos();

function GetInfo() {
    if (isInfoValid()) {
        var bookMarks = {
            WebsiteName: SiteName.value,
            Visit: SiteURL.value
        };
        InfosArr.push(bookMarks);
        clear();
        onDataChange();
    }
}

// Display info at table
function displayInfos() {
    var holder_table = "";
    for (var i = 0; i < InfosArr.length; i++) {
        holder_table += `
        <tr>
            <td>${i}</td>
            <td>${InfosArr[i].WebsiteName}</td>
            <td><button onclick="visitSite(${i})" class="btn btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
            <td><button onclick="Deleleinfo(${i})" class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tableBody").innerHTML = holder_table;
}

// Clear data from input fields
function clear() {
    SiteName.value = "";
    SiteURL.value = "";
}

// Update database
function onDataChange() {
    localStorage.setItem("websiteInfos", JSON.stringify(InfosArr));
    displayInfos();
}

// Delete function
function Deleleinfo(index) {
    InfosArr.splice(index, 1);
    displayInfos();
    onDataChange();
}

// Open the link in a new tab
function visitSite(index) {
    var url = InfosArr[index].Visit;
    var httpsRegex = /^https?:\/\//;

    if (!httpsRegex.test(url)) {
        url = `https://${url}`;
    }

    window.open(url, '_blank');
}

// Validate input fields
function isInfoValid() {
    var namePattern = /^\w{3,}(\s+\w+)*$/;
    var urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,63}(:\d{2,5})?(\/\w+)*\/?$/;

    var isNameValid = namePattern.test(SiteName.value);
    var isURLValid = urlPattern.test(SiteURL.value);

    if (!isNameValid) {
        alert("Site name must be at least 3 characters long.");
    }

    if (!isURLValid) {
        alert("Please enter a valid URL.");
    }

    return isNameValid && isURLValid;
}
