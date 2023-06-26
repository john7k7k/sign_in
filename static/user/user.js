// 获取表单和输入框的引用
const form = document.getElementById('myForm');
const input = document.getElementById('myInput');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  const inputValue = input.value; 
  alert('s');
  fetch(` http://127.0.0.1:80/sql/get/fish_table/IDs=${inputValue}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});