document.addEventListener("DOMContentLoaded", function() {
    const newUserBtn = document.getElementById("newUserBtn");
    const modal = document.getElementById("userForm");
    const submitBtn = document.getElementById("submitBtn");
    const dataTable = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    const form = document.getElementById("myForm");
    let userData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
    let isEdit = false;
    let editIndex = -1;
    
    newUserBtn.addEventListener('click', function() {
        isEdit = false;
        editIndex = -1;
        form.reset();
        modal.style.display = "block";
    });

    document.querySelector(".close").addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    function showData() {
        dataTable.innerHTML = "";
        userData.forEach((user, index) => {
            const row = dataTable.insertRow();
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.city}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <button class="btn edit-btn" onclick="editUser(${index})">Edit</button>
                    <button class="btn delete-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
        });
    }

    showData();

    submitBtn.addEventListener('click', function() {
        const name = document.getElementById("name").value;
        const city = document.getElementById("city").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (name && city && email && phone) {
            if (isEdit && editIndex !== -1) {
                userData[editIndex] = { name, city, email, phone };
                isEdit = false;
                editIndex = -1;
            } else {
                userData.push({ name, city, email, phone });
            }
            localStorage.setItem('userProfile', JSON.stringify(userData));
            showData();
            form.reset();
            modal.style.display = "none";
        } else {
            alert("Please fill in all fields!");
        }
    });

    window.editUser = function(index) {
        isEdit = true;
        editIndex = index;
        const user = userData[index];
        document.getElementById("name").value = user.name;
        document.getElementById("city").value = user.city;
        document.getElementById("email").value = user.email;
        document.getElementById("phone").value = user.phone;
        modal.style.display = "block";
    }

    window.deleteUser = function(index) {
        if (confirm("Are you sure you want to delete this user?")) {
            userData.splice(index, 1);
            localStorage.setItem('userProfile', JSON.stringify(userData));
            showData();
        }
    }
});
