function bajar() {
  window.scrollTo(0, document.body.scrollHeight);
}
function bajarMenu() {
  const seccionDestino = document.getElementById("menu1");
  window.scrollTo(0, seccionDestino.offsetTop-150);
}
// js de integrantes
function irASeccion() {
  window.location.href = 'Index.html#menu1';
}