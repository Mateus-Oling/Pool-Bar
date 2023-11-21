// script.js

document.addEventListener("DOMContentLoaded", (event) => {
  const textAreas = document.querySelectorAll("textarea");

  textAreas.forEach((textarea) => {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      salvarDados();
    });
  });

  const firebaseConfig = {
    apiKey: "AIzaSyBa_7FqONS3BVsxEpSwRzL2YTjT8qvIZrw",
    authDomain: "pool-bar-6e202.firebaseapp.com",
    databaseURL: "https://pool-bar-6e202-default-rtdb.firebaseio.com",
    projectId: "pool-bar-6e202",
    storageBucket: "pool-bar-6e202.appspot.com",
    messagingSenderId: "1004986657740",
    appId: "1:1004986657740:web:2afb7f1d4a77a5cf55cb69",
    measurementId: "G-GYB892KNDE",
  };

  const app = firebase.initializeApp(firebaseConfig);
  const dataBase = app.database();

  function salvarDados() {
    textAreas.forEach((textarea) => {
      const data = {
        value: textarea.value,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      };

      dataBase.ref(textarea.id).set(data);
    });
  }

  function carregarDadosSalvos() {
    textAreas.forEach((textarea) => {
      dataBase.ref(textarea.id).on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          textarea.value = data.value;
          textarea.style.height = textarea.scrollHeight + "px";
        }
      });
    });
  }

  window.onload = carregarDadosSalvos;

  function atualizarRelogio() {
    let currentTime = new Date();
    let hrs = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    let min =
      (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    let sec =
      (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();

    document.getElementById("hrs").innerHTML = hrs;
    document.getElementById("min").innerHTML = min;
    document.getElementById("sec").innerHTML = sec;
  }

  setInterval(atualizarRelogio, 1000);

  window.addEventListener("beforeunload", () => {
    salvarDados();
  });
});
