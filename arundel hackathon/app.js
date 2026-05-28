import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const {
  initializeApp,
  getFirestore,
  getAuth,
  signInAnonymously
} = window.firebaseModules;

// YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);

// Anonymous Login
signInAnonymously(auth)
  .then(() => {
    console.log("User signed in anonymously");
    loadTasks();
  })
  .catch((error) => {
    console.error(error);
  });

// ADD TASK
window.addTask = async function () {

  const taskInput = document.getElementById("taskInput");
  const taskDetails = document.getElementById("taskDetails");
  const taskList = document.getElementById("taskList");

  if (taskInput.value === "") {
    alert("Please enter a homework task.");
    return;
  }

  try {

    // Save to Firebase
    await addDoc(collection(db, "homeworkTasks"), {
      title: taskInput.value,
      details: taskDetails.value,
      createdAt: new Date()
    });

    // Display instantly
    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
      <strong>${taskInput.value}</strong>
      <p>${taskDetails.value}</p>
    `;

    taskList.appendChild(task);

    // Clear form
    taskInput.value = "";
    taskDetails.value = "";

  } catch (error) {
    console.error("Error adding task:", error);
  }
};

// LOAD TASKS
async function loadTasks() {

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  const querySnapshot = await getDocs(
    collection(db, "homeworkTasks")
  );

  querySnapshot.forEach((doc) => {

    const data = doc.data();

    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
      <strong>${data.title}</strong>
      <p>${data.details}</p>
    `;

    taskList.appendChild(task);

  });
}