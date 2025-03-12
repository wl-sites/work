// Sélection des éléments
const navLinks = document.getElementById("navLinks");
const burger = document.querySelector(".burger");

// Fonction pour ouvrir/fermer le menu
function toggleMenu() {
    navLinks.classList.toggle("active");
}

// Fonction pour fermer le menu
function closeMenu() {
    navLinks.classList.remove("active");
}

// Ferme le menu lorsqu'on clique sur un lien
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

// Ferme le menu lorsqu'on clique en dehors du menu
document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !burger.contains(event.target)) {
        closeMenu();
    }
});


// burger Animation 
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
        // Ajoute ou enlève la classe active pour l'animation du menu
        nav.classList.toggle("nav-active");

        // Anime chaque lien avec un délai progressif
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""; // Si l'animation est déjà là, on la réinitialise
            } else {
                link.style.animation = `fadeIn 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animation du burger en mode croix
        burger.classList.toggle("toggle");
    });
});

/* Animation keyframes */
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}`;
document.head.appendChild(style);


// clic 
document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll("#navLinks a");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien

            let targetId = this.getAttribute("href").substring(1); // Récupère l'ID de la section
            let targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50, // Ajuste selon la hauteur du header si nécessaire
                    behavior: "smooth"
                });
            }
        });
    });
});



// Vérifier si un utilisateur est déjà connecté
document.addEventListener("DOMContentLoaded", () => {
    let user = localStorage.getItem("username");
    if (user) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("todoApp").style.display = "block";
        document.getElementById("appk").style.display = "block";
        document.getElementById("user").textContent = user;
        loadTasks();
    }
});

// Fonction de connexion
function login() {
    let username = document.getElementById("username").value.trim();
    if (username !== "") {
        localStorage.setItem("username", username);
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("todoApp").style.display = "block";
        document.getElementById("appk").style.display = "block";
        document.getElementById("user").textContent = username;
    } else {
        alert("Veuillez entrer un nom d'utilisateur.");
    }
}

// Ajouter une tâche
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
        let taskList = document.getElementById("taskList");
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" onclick="toggleTask(this)">
            <span>${taskText}</span>
            <button onclick="removeTask(this)">❌</button>
        `;
        taskList.appendChild(li);
        saveTasks();
        taskInput.value = "";
    }
}

// Cocher/Décocher une tâche
function toggleTask(checkbox) {
    let task = checkbox.nextElementSibling;
    task.style.textDecoration = checkbox.checked ? "line-through" : "none";
    saveTasks();
}

// Supprimer une tâche
function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

// Sauvegarder les tâches
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.children[1].textContent,
            completed: li.children[0].checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger les tâches sauvegardées
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" onclick="toggleTask(this)" ${task.completed ? "checked" : ""}>
            <span style="text-decoration: ${task.completed ? "line-through" : "none"}">${task.text}</span>
            <button onclick="removeTask(this)">❌</button>
        `;
        document.getElementById("taskList").appendChild(li);
    });
}

// Fonction de déconnexion
document.getElementById("logoutBtn").addEventListener("click", function() {
    // Supprimer toutes les données de l'utilisateur
    localStorage.removeItem("username");
    localStorage.removeItem("tasks");

    // Cacher la To-Do List et appk
    document.getElementById("todoApp").style.display = "none";
    document.getElementById("appk").style.display = "none";

    // Afficher le formulaire de connexion
    document.getElementById("loginContainer").style.display = "block";

    // Effacer le champ du nom d'utilisateur
    document.getElementById("username").value = ""; 

    // Recharger la page pour tout réinitialiser
    setTimeout(() => {
        location.reload();
    }, 500);
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("Service Worker enregistré"))
      .catch((error) => console.log("Erreur lors de l’enregistrement du Service Worker", error));
  }