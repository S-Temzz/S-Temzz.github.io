import {
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

import { db } from "./firebase.js";

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
      <strong>${escapeHtml(taskInput.value)}</strong>
      <p>${escapeHtml(taskDetails.value)}</p>
    `;

    taskList.appendChild(task);

    // Clear form
    taskInput.value = "";
    taskDetails.value = "";

  } catch (error) {
    console.error("Error adding task:", error);
    alert("Error saving task. Please try again.");
  }
};

// LOAD TASKS FROM FIREBASE
async function loadTasks() {

  const taskList = document.getElementById("taskList");

  if (!taskList) return;

  taskList.innerHTML = "";

  try {
    const querySnapshot = await getDocs(
      collection(db, "homeworkTasks")
    );

    querySnapshot.forEach((doc) => {

      const data = doc.data();

      const task = document.createElement("div");
      task.classList.add("task");

      task.innerHTML = `
        <strong>${escapeHtml(data.title)}</strong>
        <p>${escapeHtml(data.details || "")}</p>
      `;

      taskList.appendChild(task);

    });
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  if (!text) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});