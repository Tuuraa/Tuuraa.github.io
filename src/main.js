path = "public"

const menuData = {
  "Врапы": ["afina.jpg", "amigo.jpg", "bbk.jpg"],
  "Хот-Доги": ["chicago.jpg", "sambrero.jpg", "student.jpg"]
};


async function loadMenu(category) {
  const menuWrapper = document.querySelector('.menu-wrapper');
  menuWrapper.innerHTML = ''; 
  menu_items = {}

  await fetch("./public/menu.json")
    .then(response => response.json())
    .then(data => {
      menu_items = data
    })
    .catch(error => {
      console.error('Ошибка загрузки файла:', error);
    });

  menu_items[category].forEach(item => {

    const div_item = document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement('p');

    img.src = `${path}/${category}${item.path}`;
    p.textContent = `Название - ${item.name}. Описание - ${item.description}`
    div_item.classList.add('menu-item')

    div_item.appendChild(img);
    div_item.appendChild(p);
    menuWrapper.appendChild(div_item);
  })
  
}



document.querySelectorAll('.category-list button').forEach(button => {
  button.addEventListener('click', () => {
      loadMenu(button.textContent);
  });
});

loadMenu(document.querySelector('.category-list button').textContent);
