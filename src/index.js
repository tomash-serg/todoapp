import './sass/main.scss';
import { BASE_URL } from './js/optionsApiServise';
import todoTemp from './temp/todoTemp.hbs';
import FetchData from './js/getApiServise';
import addData from './js/addData';
import delData from './js/delData';
import editData from './js/editData';

const FetchEntry = new FetchData(BASE_URL);
const addEntry = new addData(BASE_URL);
const delEntry = new delData(BASE_URL);
const editEntry = new editData(BASE_URL);

const printApp = () => FetchEntry.fetch().then(render).catch(console.log);
printApp();

function render(data) {
  const markup = todoTemp(data);
  document.body.innerHTML = '';
  document.body.insertAdjacentHTML('afterbegin', markup);
  addEventsListeners();
}
const addEventsListeners = function () {
  document.querySelector('.add-btn').addEventListener('click', onAddBtnClick);
  document
    .querySelectorAll('.del-btn')
    .forEach(btn => btn.addEventListener('click', onDelBtnClick));
  document
    .querySelectorAll('.edit-btn')
    .forEach(btn => btn.addEventListener('click', onEditBtnClick));
};
function onAddBtnClick(e) {
  document.querySelector('.modal').removeAttribute('hidden');
  document.querySelector('.modal-btn').addEventListener('click', onModalBtnClick);
}
async function onModalBtnClick() {
  const value = document.querySelector('.modal-input').value;
  document.querySelector('.modal').setAttribute('hidden', '');
  await addEntry.post(value);
  printApp();
}
async function onDelBtnClick(e) {
  const id = e.currentTarget.dataset.id;
  await delEntry.del(id);
  printApp();
}
function onEditBtnClick(e) {
  const id = e.currentTarget.dataset.id;
  const content = document.querySelector(`[data-id="${id}"]`).textContent;
  document.querySelector('.modal-input').value = content;
  document.querySelector('.modal').removeAttribute('hidden');
  document.querySelector('.modal-btn').addEventListener('click', () => {
    onEditModalBtnClick(id, content);
  });
}
async function onEditModalBtnClick(id) {
  const value = document.querySelector('.modal-input').value;
  await editEntry.patch(id, value);
  printApp();
}
